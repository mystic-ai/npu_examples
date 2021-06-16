# GPT-J-6B

#### Tags

> ['Text Generation']

### Model Description

GPT-J-6B is a transformer [model](https://github.com/kingoflolz/mesh-transformer-jax) created by Ben Wang and Aran Komatsuzaki and the team at EleutherAI. GPT-J-6B performs nearly on par with 6.7B GPT-3 (or Curie) on various zero-shot down-streaming tasks.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '60ca2a1e54f6ecb69867c72c'
data = ['When I visit Bath I will']

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
[{'generated_text': 'When I visit Bath I will drive out of my home and spend the next'}]
```

### Performance

The zero-shot performance is roughly on par with GPT-3 of comparable size, and the performance gap from GPT-3 of comparable size is closer than the GPT-Neo models.

<p class="aligncenter">
    <img src="https://arankomatsuzaki.files.wordpress.com/2021/06/gptj-table.png" width="auto" >
</p>

### BibTeX and Citation

More information regarding the model and how it's been trained by the authors can be found [here](https://arankomatsuzaki.wordpress.com/2021/06/04/gpt-j/). Neuro provides instant infrastructure to allow access to their trained model.

```bibtex
@misc{gpt-j,
  author = {Wang, Ben and Komatsuzaki, Aran},
  title = {{GPT-J-6B: A 6 Billion Parameter Autoregressive Language Model}},
  howpublished = {\url{https://github.com/kingoflolz/mesh-transformer-jax}},
  year = 2021,
  month = May
}
```
