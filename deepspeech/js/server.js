const http = require('http');
const socketIO = require('socket.io');
const VAD = require('node-vad');
const fetch = require('node-fetch');
//const Request = require("Request")


let SILENCE_THRESHOLD = 200; // how many milliseconds of inactivity before processing the audio

const SERVER_PORT = 4000; // websocket server port

// const VAD_MODE = VAD.Mode.NORMAL;
// const VAD_MODE = VAD.Mode.LOW_BITRATE;
// const VAD_MODE = VAD.Mode.AGGRESSIVE;
const VAD_MODE = VAD.Mode.VERY_AGGRESSIVE;
const vad = new VAD(VAD_MODE);

let recordedChunks = 0;
let silenceStart = null;
let recordedAudioLength = 0;
let endTimeout = null;
let silenceBuffers = [];
let chunks = [];

function processAudioStream(data, callback) {
	vad.processAudio(data, 16000).then((res) => {
		switch (res) {
			case VAD.Event.ERROR:
				console.log("VAD ERROR");
				break;
			case VAD.Event.NOISE:
				console.log("VAD NOISE");
				break;
			case VAD.Event.SILENCE:
				processSilence(data, callback);
				break;
			case VAD.Event.VOICE:
				processVoice(data);
				break;
			default:
				console.log('default', res);
				
		}
	});
	
	// timeout after 1s of inactivity
	clearTimeout(endTimeout);
	endTimeout = setTimeout(function() {
		console.log('timeout');
		resetAudioStream();
	},10000);
}

function endAudioStream(callback) {
	console.log('[end]');
	let results = intermediateDecode();
	if (results) {
		if (callback) {
			callback(results);
		}
	}
}

function resetAudioStream() {
	clearTimeout(endTimeout);
	console.log('[reset]');
	intermediateDecode(); // ignore results
	recordedChunks = 0;
	silenceStart = null;
	chunks = [];
}

function processSilence(data, callback) {
	if (recordedChunks > 0) { // recording is on
		process.stdout.write('-'); // silence detected while recording
		
		feedAudioContent(data);
		
		if (silenceStart === null) {
			silenceStart = new Date().getTime();
		}
		else {
			let now = new Date().getTime();
			if (now - silenceStart > SILENCE_THRESHOLD) {
				silenceStart = null;
				console.log('[end]');
				let results = intermediateDecode();
				if (results) {
					if (callback) {
						callback(results);
					}
				}
			}
		}
	}
	else {
		process.stdout.write('.'); // silence detected while not recording
		bufferSilence(data);
	}
}

function bufferSilence(data) {
	// VAD has a tendency to cut the first bit of audio data from the start of a recording
	// so keep a buffer of that first bit of audio and in addBufferedSilence() reattach it to the beginning of the recording
	silenceBuffers.push(data);
	if (silenceBuffers.length >= 3) {
		silenceBuffers.shift();
	}
}

function addBufferedSilence(data) {
	let audioBuffer;
	if (silenceBuffers.length) {
		silenceBuffers.push(data);
		let length = 0;
		silenceBuffers.forEach(function (buf) {
			length += buf.length;
		});
		audioBuffer = Buffer.concat(silenceBuffers, length);
		silenceBuffers = [];
	}
	else audioBuffer = data;
	return audioBuffer;
}

function processVoice(data) {
	silenceStart = null;
	if (recordedChunks === 0) {
		console.log('');
		process.stdout.write('[start]'); // recording started
	}
	else {
		process.stdout.write('='); // still recording
	}
	recordedChunks++;
	
	data = addBufferedSilence(data);
	feedAudioContent(data);
}

function createStream() {
//	modelStream = englishModel.createStream();
	recordedChunks = 0;
	recordedAudioLength = 0;
	chunks = []
}

function finishStream() {
//	if (modelStream) {
		let start = new Date();
		chunks = Buffer.concat(chunks)
        intchunks = new Int16Array(chunks.buffer, 0, Math.floor(chunks.byteLength / 2));
        data = Array.from(intchunks)
        let json = {"modelId": "603e740bf121b97d91fc45ff",
                   "scripts": ["ds_2"],
                   "data": data
              }
        json = JSON.stringify(json)
//        console.log(json)
//		let text = modelStream.finishStream();
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": "Bearer " + process.env.API_TOKEN
            },
            body: json
        };
        text = fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", fetchOptions)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              console.error(response);
              throw new Error('Something went wrong on api server!');
            }
          })
          .then(response => {
               console.log('');
               let text = response["result"]
               console.log('Recognized Text:', text);

                let recogTime = new Date().getTime() - start.getTime();
                results =  {
                    text,
                    recogTime,
                    audioLength: Math.round(recordedAudioLength)
                };
                return results
//            console.debug(response);
            // ...
          }).catch(error => {
            console.error(error);
          });
//          console.log(text)
          return text
//        text = null;
//		if (text) {
//
//		}
//	}
	silenceBuffers = [];
//	modelStream = null;
}

function intermediateDecode() {
	let results = finishStream();
	createStream();
	return results;
}

function feedAudioContent(chunk) {
	recordedAudioLength += (chunk.length / 2) * (1 / 16000) * 1000;
	chunks.push(chunk)
//	modelStream.feedAudioContent(chunk);
}

const app = http.createServer(function (req, res) {
	res.writeHead(200);
	res.write('web-microphone-websocket');
	res.end();
});

const io = socketIO(app, {});
io.set('origins', '*:*');

io.on('connection', function(socket) {
	console.log('client connected');
	
	socket.once('disconnect', () => {
		console.log('client disconnected');
	});
	
	createStream();
	
	socket.on('stream-data', function(data) {
		processAudioStream(data, (results) => {
		results.then(function(v) {
            socket.emit('recognize', v);
        }, function(e) {
          console.error('rejected', e);
        });
		});
	});
	
	socket.on('stream-end', function() {
		endAudioStream((results) => {
			socket.emit('recognize', results);
		});
	});
	
	socket.on('stream-reset', function() {
		resetAudioStream();
	});
});

app.listen(SERVER_PORT, 'localhost', () => {
	console.log('Socket server listening on:', SERVER_PORT);
});

module.exports = app;