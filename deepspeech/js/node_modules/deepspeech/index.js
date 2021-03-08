"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_pre_gyp_1 = __importDefault(require("node-pre-gyp"));
const path_1 = __importDefault(require("path"));
// 'lib', 'binding', 'v0.1.1', ['node', 'v' + process.versions.modules, process.platform, process.arch].join('-'), 'deepspeech-bindings.node')
const binding_path = node_pre_gyp_1.default.find(path_1.default.resolve(path_1.default.join(__dirname, 'package.json')));
// On Windows, we can't rely on RPATH being set to $ORIGIN/../ or on
// @loader_path/../ but we can change the PATH to include the proper directory
// for the dynamic linker
if (process.platform === 'win32') {
    var dslib_path = path_1.default.resolve(path_1.default.join(binding_path, '../..'));
    // electron-builder does weird magic hand-in-hand with electronjs,
    // and messes with the path where we expect things to be for the Windows
    // linker.
    if ('electron' in process.versions) {
        dslib_path = dslib_path.replace("app.asar", "app.asar.unpacked");
    }
    var oldPath = process.env.PATH;
    process.env['PATH'] = `${dslib_path};${process.env.PATH}`;
}
const binding = require(binding_path);
if (process.platform === 'win32') {
    process.env['PATH'] = oldPath;
}
/**
 * Provides an interface to a DeepSpeech stream. The constructor cannot be called
 * directly, use :js:func:`Model.createStream`.
 */
class StreamImpl {
    /**
     * @param nativeStream SWIG wrapper for native StreamingState object.
     */
    constructor(nativeStream) {
        this._impl = nativeStream;
    }
    /**
     * Feed audio samples to an ongoing streaming inference.
     *
     * @param aBuffer An array of 16-bit, mono raw audio samples at the
     *                 appropriate sample rate (matching what the model was trained on).
     */
    feedAudioContent(aBuffer) {
        binding.FeedAudioContent(this._impl, aBuffer);
    }
    /**
     * Compute the intermediate decoding of an ongoing streaming inference.
     *
     * @return The STT intermediate result.
     */
    intermediateDecode() {
        return binding.IntermediateDecode(this._impl);
    }
    /**
     * Compute the intermediate decoding of an ongoing streaming inference, return results including metadata.
     *
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this. Default value is 1 if not specified.
     *
     * @return :js:func:`Metadata` object containing multiple candidate transcripts. Each transcript has per-token metadata including timing information. The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`. Returns undefined on error.
     */
    intermediateDecodeWithMetadata(aNumResults = 1) {
        return binding.IntermediateDecodeWithMetadata(this._impl, aNumResults);
    }
    /**
     * Compute the final decoding of an ongoing streaming inference and return the result. Signals the end of an ongoing streaming inference.
     *
     * @return The STT result.
     *
     * This method will free the stream, it must not be used after this method is called.
     */
    finishStream() {
        const result = binding.FinishStream(this._impl);
        this._impl = null;
        return result;
    }
    /**
     * Compute the final decoding of an ongoing streaming inference and return the results including metadata. Signals the end of an ongoing streaming inference.
     *
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this. Default value is 1 if not specified.
     *
     * @return Outputs a :js:func:`Metadata` struct of individual letters along with their timing information. The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`.
     *
     * This method will free the stream, it must not be used after this method is called.
     */
    finishStreamWithMetadata(aNumResults = 1) {
        const result = binding.FinishStreamWithMetadata(this._impl, aNumResults);
        this._impl = null;
        return result;
    }
}
/**
 * An object providing an interface to a trained DeepSpeech model.
 */
class Model {
    /**
     * @param aModelPath The path to the frozen model graph.
     *
     * @throws on error
     */
    constructor(aModelPath) {
        this._impl = null;
        const [status, impl] = binding.CreateModel(aModelPath);
        if (status !== 0) {
            throw `CreateModel failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
        this._impl = impl;
    }
    /**
     * Get beam width value used by the model. If :js:func:`Model.setBeamWidth` was
     * not called before, will return the default value loaded from the model file.
     *
     * @return Beam width value used by the model.
     */
    beamWidth() {
        return binding.GetModelBeamWidth(this._impl);
    }
    /**
     * Set beam width value used by the model.
     *
     * @param aBeamWidth The beam width used by the model. A larger beam width value generates better results at the cost of decoding time.
     *
     * @throws on error
     */
    setBeamWidth(aBeamWidth) {
        const status = binding.SetModelBeamWidth(this._impl, aBeamWidth);
        if (status !== 0) {
            throw `SetModelBeamWidth failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Add a hot-word and its boost
     *
     * @param aWord word
     * @param aBoost boost
     *
     * @throws on error
     */
    addHotWord(aWord, aBoost) {
        const status = binding.AddHotWord(this._impl, aWord, aBoost);
        if (status !== 0) {
            throw `addHotWord failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Erase entry for hot-word
     *
     * @param aWord word
     *
     * @throws on error
     */
    eraseHotWord(aWord) {
        const status = binding.EraseHotWord(this._impl, aWord);
        if (status !== 0) {
            throw `eraseHotWord failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Clear all hot-word entries
     *
     * @throws on error
     */
    clearHotWords() {
        const status = binding.ClearHotWords(this._impl);
        if (status !== 0) {
            throw `clearHotWord failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Return the sample rate expected by the model.
     *
     * @return Sample rate.
     */
    sampleRate() {
        return binding.GetModelSampleRate(this._impl);
    }
    /**
     * Enable decoding using an external scorer.
     *
     * @param aScorerPath The path to the external scorer file.
     *
     * @throws on error
     */
    enableExternalScorer(aScorerPath) {
        const status = binding.EnableExternalScorer(this._impl, aScorerPath);
        if (status !== 0) {
            throw `EnableExternalScorer failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Disable decoding using an external scorer.
     *
     * @throws on error
     */
    disableExternalScorer() {
        const status = binding.DisableExternalScorer(this._impl);
        if (status !== 0) {
            throw `DisableExternalScorer failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Set hyperparameters alpha and beta of the external scorer.
     *
     * @param aLMAlpha The alpha hyperparameter of the CTC decoder. Language Model weight.
     * @param aLMBeta The beta hyperparameter of the CTC decoder. Word insertion weight.
     *
     * @throws on error
     */
    setScorerAlphaBeta(aLMAlpha, aLMBeta) {
        const status = binding.SetScorerAlphaBeta(this._impl, aLMAlpha, aLMBeta);
        if (status !== 0) {
            throw `SetScorerAlphaBeta failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
    }
    /**
     * Use the DeepSpeech model to perform Speech-To-Text.
     *
     * @param aBuffer A 16-bit, mono raw audio signal at the appropriate sample rate (matching what the model was trained on).
     *
     * @return The STT result. Returns undefined on error.
     */
    stt(aBuffer) {
        return binding.SpeechToText(this._impl, aBuffer);
    }
    /**
     * Use the DeepSpeech model to perform Speech-To-Text and output metadata
     * about the results.
     *
     * @param aBuffer A 16-bit, mono raw audio signal at the appropriate sample rate (matching what the model was trained on).
     * @param aNumResults Maximum number of candidate transcripts to return. Returned list might be smaller than this.
     * Default value is 1 if not specified.
     *
     * @return :js:func:`Metadata` object containing multiple candidate transcripts. Each transcript has per-token metadata including timing information.
     * The user is responsible for freeing Metadata by calling :js:func:`FreeMetadata`. Returns undefined on error.
     */
    sttWithMetadata(aBuffer, aNumResults = 1) {
        return binding.SpeechToTextWithMetadata(this._impl, aBuffer, aNumResults);
    }
    /**
     * Create a new streaming inference state. One can then call :js:func:`StreamImpl.feedAudioContent` and :js:func:`StreamImpl.finishStream` on the returned stream object.
     *
     * @return a :js:func:`StreamImpl` object that represents the streaming state.
     *
     * @throws on error
     */
    createStream() {
        const [status, ctx] = binding.CreateStream(this._impl);
        if (status !== 0) {
            throw `CreateStream failed: ${binding.ErrorCodeToErrorMessage(status)} (0x${status.toString(16)})`;
        }
        return new StreamImpl(ctx);
    }
}
exports.Model = Model;
/**
 * Frees associated resources and destroys model object.
 *
 * @param model A model pointer returned by :js:func:`Model`
 *
 */
function FreeModel(model) {
    binding.FreeModel(model._impl);
}
exports.FreeModel = FreeModel;
/**
 * Free memory allocated for metadata information.
 *
 * @param metadata Object containing metadata as returned by :js:func:`Model.sttWithMetadata` or :js:func:`StreamImpl.finishStreamWithMetadata`
 */
function FreeMetadata(metadata) {
    binding.FreeMetadata(metadata);
}
exports.FreeMetadata = FreeMetadata;
/**
 * Destroy a streaming state without decoding the computed logits. This
 * can be used if you no longer need the result of an ongoing streaming
 * inference and don't want to perform a costly decode operation.
 *
 * @param stream A streaming state pointer returned by :js:func:`Model.createStream`.
 */
function FreeStream(stream) {
    binding.FreeStream(stream._impl);
}
exports.FreeStream = FreeStream;
/**
 * Returns the version of this library. The returned version is a semantic
 * version (SemVer 2.0.0).
 */
function Version() {
    return binding.Version();
}
exports.Version = Version;
