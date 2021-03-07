# Deepspeech streaming

To run this example script you require an account token from [the Neuro API here](https://getneuro.ai). You export that token as an environment variable in terminal:

```export API_TOKEN=...```


This deepspeech example streams audio from a mic over to the serverless compute engine at Neuro. It expects a 16khz input mic (this can be adjusted form this source code). The default input device is 2, which is the default device number for AirPods on a MacBook. To find your inputs mics on your local machine run the following in python:

```import pyaudio
p = pyaudio.PyAudio()
for i in range(p.get_device_count()):
    print(p.get_device_info_by_index(i))
```

You find the device you want to use and change the ID on line 130 in test_stream.py:

```
vad_audio = VADAudio(aggressiveness=2 ,
                     input_rate=16000,
                     device=2)
```

To test deepspeech here you simply install the requirements (```pip3 install -r requirements```) and then run:

```python3 test_stream.py```

Or

```python test_stream.py```

Depending on your setup. Please feel free to drop feedback or give requests!
