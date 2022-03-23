# GPT-J-6B

#### Tags

> ['Text Generation']

### Model Description

GPT-J-6B is a transformer [model](https://github.com/kingoflolz/mesh-transformer-jax) created by Ben Wang and Aran Komatsuzaki and the team at EleutherAI. GPT-J-6B performs nearly on par with 6.7B GPT-3 (or Curie) on various zero-shot down-streaming tasks.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Pipeline Cloud's Dashboard. If you don't have a Pipeline Cloud account, you can register in the [Pipeline Cloud Dashboard](https://dashboard.pipeline.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `pipeline` library which you can install with `pip install --U pipeline-ai`

Using your API Token, this is all the code you need to run the model.

```python
from pipeline import PipelineCloud

api = PipelineCloud("API_TOKEN")

run = api.run_pipeline(
    "pipeline_d7502b78863744c495d7d22f321cf7ff",
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

### Performance

The zero-shot performance is roughly on par with GPT-3 of comparable size, and the performance gap from GPT-3 of comparable size is closer than the GPT-Neo models.

![gptj table](https://arankomatsuzaki.files.wordpress.com/2021/06/gptj-table.png)

### BibTeX and Citation

More information regarding the model and how it's been trained by the authors can be found [here](https://arankomatsuzaki.wordpress.com/2021/06/04/gpt-j/). The original model can be found [here](https://github.com/kingoflolz/mesh-transformer-jax). Thanks to @finetuneanon for his support on translating the model to work on GPU and half precision.

Pipeline Cloud provides instant infrastructure to allow access to their trained model.

```bibtex
@misc{gpt-j,
  author = {Wang, Ben and Komatsuzaki, Aran},
  title = {{GPT-J-6B: A 6 Billion Parameter Autoregressive Language Model}},
  howpublished = {\url{https://github.com/kingoflolz/mesh-transformer-jax}},
  year = 2021,
  month = May
}
```
