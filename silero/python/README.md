# Silero streaming

To run this example script you require an account token from [the Neuro API here](https://getneuro.ai). You export that token as an environment variable in terminal:

`export API_TOKEN=...`

This silero example streams audio from a mic over to the serverless compute engine at Neuro. It expects a 16khz input mic (this can be adjusted form this source code). The default input device is 2, which is the default device number for AirPods on a MacBook. To find your inputs mics on your local machine run the following in python:

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

To test Silero here you simply install the requirements (`pip3 install -r requirements.txt`) and then run:

`python3 test_stream.py`

Or

`python test_stream.py`

Depending on your setup. Please feel free to drop feedback or give requests!

Full terminal script to test out of the box in a virtual python env (this does assume you have put your Neuro API key as an environment variable as shown above):

```
git clone https://github.com/neuro-ai-dev/npu_examples.git
cd npu_examples/silero/python
python3 -m venv venv
source venv/bin/activate
python -m pip install -U pip
pip install -r requirements.txt

python test_stream.py
```

[Silero git repo](https://github.com/snakers4/silero-models)
