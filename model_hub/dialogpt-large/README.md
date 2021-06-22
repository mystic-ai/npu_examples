# GPT-J-6B

#### Tags

> ['Text Generation']

### Model Description

[DialoGPT](https://github.com/microsoft/DialoGPT) is a SOTA large-scale pretrained dialogue response generation model for multiturn conversations. The human evaluation results indicate that the response generated from DialoGPT is comparable to human response quality under a single-turn conversation Turing test. The model is trained on 147M multi-turn dialogue from Reddit discussion thread.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '60d1d2f1861efa57850507a7'
data = ['Hello how are you?']

kwargs = {
    'max_length':15 # How many generated tokens you want [Int]
    'remove_input': True # Remove input text from predicted text (Default: False) [Bool]
    'penalty': 1.0 # Define penalty for repeated words, value close to 0 will highly repeat generated output (Default: 1.0) [Float]
}

output = npu.predict(model_id, data, kwargs)
print(output)
```

If you run the script above, in your terminal you will see a similar output to the following,

```
[Neuro Ai] 16:20:17 - [INFO]: DEPLOYMENT MODE
[Neuro Ai] 16:20:17 - [INFO]: Token successfully authenticated
[Neuro Ai] 16:20:17 - [INFO]: Using project: Default
[{'generated_text': "How are you?I'm good. Hbu?Yes not too bad thanks, what are you doing?Same to me! I'm chilling with a friend", 'generated_text_with_special_tokens': "How are you?<|endoftext|>I'm good. Hbu?<|endoftext|>Yes not too bad thanks, what are you doing?<|endoftext|>Same to me! I'm chilling with a friend<|endoftext|>"}]
```

### BibTeX and Citation

More information regarding the model and how it's been trained by the authors can be found [here](https://github.com/microsoft/DialoGPT).

```bibtex
@inproceedings{zhang2019dialogpt,
    title={DialoGPT: Large-Scale Generative Pre-training for Conversational Response Generation},
    author={Yizhe Zhang and Siqi Sun and Michel Galley and Yen-Chun Chen and Chris Brockett and Xiang Gao and Jianfeng Gao and Jingjing Liu and Bill Dolan},
    year={2020},
    booktitle={ACL, system demonstration}
}
```
