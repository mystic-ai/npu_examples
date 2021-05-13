#!/usr/bin/env node
"use strict";
// This is required for process.versions.electron below
/// <reference types="electron" />
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ds = __importStar(require("./index"));
const Fs = __importStar(require("fs"));
const sox_stream_1 = __importDefault(require("sox-stream"));
const argparse = __importStar(require("argparse"));
const MemoryStream = require("memory-stream");
const Wav = require("node-wav");
const Duplex = require("stream").Duplex;
class VersionAction extends argparse.Action {
    call(parser, namespace, values, optionString) {
        console.log('DeepSpeech ' + Ds.Version());
        let runtime = 'Node';
        if (process.versions.electron) {
            runtime = 'Electron';
        }
        console.error('Runtime: ' + runtime);
        process.exit(0);
    }
}
let parser = new argparse.ArgumentParser({ addHelp: true, description: 'Running DeepSpeech inference.' });
parser.addArgument(['--model'], { required: true, help: 'Path to the model (protocol buffer binary file)' });
parser.addArgument(['--scorer'], { help: 'Path to the external scorer file' });
parser.addArgument(['--audio'], { required: true, help: 'Path to the audio file to run (WAV format)' });
parser.addArgument(['--version'], { action: VersionAction, nargs: 0, help: 'Print version and exits' });
parser.addArgument(['--extended'], { action: 'storeTrue', help: 'Output string from extended metadata' });
parser.addArgument(['--stream'], { action: 'storeTrue', help: 'Use streaming code path (for tests)' });
parser.addArgument(['--hot_words'], { help: 'Hot-words and their boosts. Word:Boost pairs are comma-separated' });
let args = parser.parseArgs();
function totalTime(hrtimeValue) {
    return (hrtimeValue[0] + hrtimeValue[1] / 1000000000).toPrecision(4);
}
function candidateTranscriptToString(transcript) {
    var retval = "";
    for (var i = 0; i < transcript.tokens.length; ++i) {
        retval += transcript.tokens[i].text;
    }
    return retval;
}
// sphinx-doc: js_ref_model_start
console.error('Loading model from file %s', args['model']);
const model_load_start = process.hrtime();
let model = new Ds.Model(args['model']);
const model_load_end = process.hrtime(model_load_start);
console.error('Loaded model in %ds.', totalTime(model_load_end));
if (args['beam_width']) {
    model.setBeamWidth(args['beam_width']);
}
// sphinx-doc: js_ref_model_stop
let desired_sample_rate = model.sampleRate();
if (args['scorer']) {
    console.error('Loading scorer from file %s', args['scorer']);
    const scorer_load_start = process.hrtime();
    model.enableExternalScorer(args['scorer']);
    const scorer_load_end = process.hrtime(scorer_load_start);
    console.error('Loaded scorer in %ds.', totalTime(scorer_load_end));
    if (args['lm_alpha'] && args['lm_beta']) {
        model.setScorerAlphaBeta(args['lm_alpha'], args['lm_beta']);
    }
}
if (args['hot_words']) {
    console.error('Adding hot-words %s', args['hot_words']);
    for (let word_boost of args['hot_words'].split(',')) {
        let word = word_boost.split(':');
        model.addHotWord(word[0], parseFloat(word[1]));
    }
}
const buffer = Fs.readFileSync(args['audio']);
const result = Wav.decode(buffer);
if (result.sampleRate < desired_sample_rate) {
    console.error(`Warning: original sample rate ( ${result.sampleRate})` +
        `is lower than ${desired_sample_rate} Hz. ` +
        `Up-sampling might produce erratic speech recognition.`);
}
function bufferToStream(buffer) {
    var stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}
let conversionStream = bufferToStream(buffer).
    pipe(sox_stream_1.default({
    global: {
        'no-dither': true,
        'replay-gain': 'off',
    },
    output: {
        bits: 16,
        rate: desired_sample_rate,
        channels: 1,
        encoding: 'signed-integer',
        endian: 'little',
        compression: 0.0,
        type: 'raw'
    }
}));
if (!args['stream']) {
    let audioStream = new MemoryStream();
    conversionStream.pipe(audioStream);
    audioStream.on('finish', () => {
        let audioBuffer = audioStream.toBuffer();
        const inference_start = process.hrtime();
        console.error('Running inference.');
        const audioLength = (audioBuffer.length / 2) * (1 / desired_sample_rate);
        // sphinx-doc: js_ref_inference_start
        if (args['extended']) {
            let metadata = model.sttWithMetadata(audioBuffer, 1);
            console.log(candidateTranscriptToString(metadata.transcripts[0]));
            Ds.FreeMetadata(metadata);
        }
        else {
            console.log(model.stt(audioBuffer));
        }
        // sphinx-doc: js_ref_inference_stop
        const inference_stop = process.hrtime(inference_start);
        console.error('Inference took %ds for %ds audio file.', totalTime(inference_stop), audioLength.toPrecision(4));
        Ds.FreeModel(model);
        process.exit(0);
    });
}
else {
    let stream = model.createStream();
    conversionStream.on('data', (chunk) => {
        stream.feedAudioContent(chunk);
        if (args['extended']) {
            let metadata = stream.intermediateDecodeWithMetadata();
            console.error('intermediate: ' + candidateTranscriptToString(metadata.transcripts[0]));
        }
        else {
            console.error('intermediate: ' + stream.intermediateDecode());
        }
    });
    conversionStream.on('end', () => {
        if (args['extended']) {
            let metadata = stream.finishStreamWithMetadata();
            console.log(candidateTranscriptToString(metadata.transcripts[0]));
        }
        else {
            console.log(stream.finishStream());
        }
    });
}
