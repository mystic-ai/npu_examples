# GPT2-large for Text Generation

#### Tags

> ['Text Generation']

### Model Description

GPT-2 is a transformers model pretrained on a very large corpus of English data in a self-supervised fashion. This means it was pretrained on the raw texts only, with no humans labelling them in any way (which is why it can use lots of publicly available data) with an automatic process to generate inputs and labels from those texts. More precisely, it was trained to guess the next word in sentences.

More precisely, inputs are sequences of continuous text of a certain length and the targets are the same sequence, shifted one token (word or piece of word) to the right. The model uses internally a mask-mechanism to make sure the predictions for the token i only uses the inputs from 1 to i but not the future tokens.

This way, the model learns an inner representation of the English language that can then be used to extract features useful for downstream tasks. The model is best at what it was pretrained for however, which is generating texts from a prompt.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Pipeline Cloud's Dashboard. If you don't have a Pipeline Cloud account, you can register in the [Pipeline Cloud Dashboard](https://dashboard.pipeline.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `pipeline` library which you can install with `pip install --U pipeline-ai`

Using your API Token, this is all the code you need to run the model.

```python
from pipeline import PipelineCloud

api = PipelineCloud("API_TOKEN")

run = api.run_pipeline(
    "pipeline_680ba5aef4f0405da3b91df24aec5906",
    [
        "I met a traveller from an antique land, who said",
        {
            "response_length": 64,  # how many output tokens to generate
            "remove_input": False  # set to True if you want the response to include your input
            # all params from the transformers library `generate` function are supported
        },
    ],
)

print(run["result_preview"])
```

### BibTeX and Citation

GPT-2 is released under the Apache 2.0 license. Pipeline Cloud provides instant infrastructure to allow access to their pre-trained model.

```bibtex
@article{radford2019language,
  title={Language Models are Unsupervised Multitask Learners},
  author={Radford, Alec and Wu, Jeff and Child, Rewon and Luan, David and Amodei, Dario and Sutskever, Ilya},
  year={2019}
}
```
