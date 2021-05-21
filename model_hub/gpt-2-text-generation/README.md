# GPT2 for Text Generation

#### Tags

> ['Text Generation']

### Model Description

GPT-2 is a transformers model pretrained on a very large corpus of English data in a self-supervised fashion. This means it was pretrained on the raw texts only, with no humans labelling them in any way (which is why it can use lots of publicly available data) with an automatic process to generate inputs and labels from those texts. More precisely, it was trained to guess the next word in sentences.

More precisely, inputs are sequences of continuous text of a certain length and the targets are the same sequence, shifted one token (word or piece of word) to the right. The model uses internally a mask-mechanism to make sure the predictions for the token i only uses the inputs from 1 to i but not the future tokens.

This way, the model learns an inner representation of the English language that can then be used to extract features useful for downstream tasks. The model is best at what it was pretrained for however, which is generating texts from a prompt.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu
import os
import numpy as np

npu.api(os.environ['API_TOKEN'], deployed=True)

input = "Hello my name is"

output = npu.predict("60a7b5224ae13749d81605a0",
    [[input]],
    input_kwargs={
        "number_of_tokens" : 10,
    }
    )[0]

print("Input: %s\nOutput: %s" % (input, output))
```

### BibTeX and Citation

Detectron2 is released under the Apache 2.0 license. Neuro provides instant infrastructure to allow access to their pre-trained model.

```bibtex
@article{radford2019language,
  title={Language Models are Unsupervised Multitask Learners},
  author={Radford, Alec and Wu, Jeff and Child, Rewon and Luan, David and Amodei, Dario and Sutskever, Ilya},
  year={2019}
}
```
