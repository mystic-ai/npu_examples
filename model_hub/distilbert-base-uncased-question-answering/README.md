# DistilBERT-base-uncased for Question-Answering

#### Tags

> ['Question Answering']

### Model Description

This model is a fine-tune checkpoint of DistilBERT-base-uncased, fine-tuned using (a second step of) knowledge distillation on SQuAD v1.1.

DistilBERT is a transformers model, smaller and faster than BERT, which was pretrained on the same corpus in a self-supervised fashion, using the BERT base model as a teacher. This means it was pretrained on the raw texts only, with no humans labelling them in any way (which is why it can use lots of publicly available data) with an automatic process to generate inputs and labels from those texts using the BERT base model. More precisely, it was pretrained with three objectives:

- Distillation loss: the model was trained to return the same probabilities as the BERT base model.
- Masked language modeling (MLM): this is part of the original training loss of the BERT base model. When taking a sentence, the model randomly masks 15% of the words in the input then run the entire masked sentence through the model and has to predict the masked words. This is different from traditional recurrent neural networks (RNNs) that usually see the words one after the other, or from autoregressive models like GPT which internally mask the future tokens. It allows the model to learn a bidirectional representation of the sentence.
- Cosine embedding loss: the model was also trained to generate hidden states as close as possible as the BERT base model.

This way, the model learns the same inner representation of the English language than its teacher model, while being faster for inference or downstream tasks.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '60a404270421e5d2d70540d1'

context = """ Nikola Tesla was born an ethnic Serb in the village of Smiljan, within the Military Frontier, in the Austrian Empire (present day Croatia), on 10 July [O.S. 28 June] 1856.[13][14] His father, Milutin Tesla (1819–1879),[15] was an Eastern Orthodox priest.[16][17][18][19] Tesla's mother, Đuka Mandić (1822–1892), whose father was also an Orthodox priest,[20] had a talent for making home craft tools and mechanical appliances and the ability to memorize Serbian epic poems. Đuka had never received a formal education. Tesla credited his eidetic memory and creative abilities to his mother's genetics and influence.[21][22] Tesla's progenitors were from western Serbia, near Montenegro.[23]
Tesla was the fourth of five children. He had three sisters, Milka, Angelina and Marica, and an older brother named Dane, who was killed in a horse riding accident when Tesla was aged five.[24] In 1861, Tesla attended primary school in Smiljan where he studied German, arithmetic, and religion.[25] In 1862, the Tesla family moved to the nearby Gospić, where Tesla's father worked as parish priest. Nikola completed primary school, followed by middle school.[25] In 1870, Tesla moved to Karlovac[26] to attend high school at the Higher Real Gymnasium where the classes were held in German, as it was usual throughout schools within the Austro-Hungarian Military Frontier.[27]
Tesla's father, Milutin, was an Orthodox priest in the village of Smiljan. Tesla later wrote that he became interested in demonstrations of electricity by his physics professor.[28] Tesla noted that these demonstrations of this "mysterious phenomena" made him want "to know more of this wonderful force".[29] Tesla was able to perform integral calculus in his head, which prompted his teachers to believe that he was cheating.[30] He finished a four-year term in three years, graduating in 1873.[31]In 1873, Tesla returned to Smiljan. Shortly after he arrived, he contracted cholera, was bedridden for nine months and was near death multiple times. Tesla's father, in a moment of despair, (who had originally wanted him to enter the priesthood)[32] promised to send him to the best engineering school if he recovered from the illness.
"""
questions = [
    "Where was Nikola Tesla raised?",
    "What were the name of his sisters?",
    "What religion was the priest?",
    "What was the major event that happened to Nikola?"
]

data = [context]

kwargs = {
    'questions': questions
}

output = npu.predict(model_id, data, kwargs)
print(output)
```

If you run the script above, in your terminal you will see the following,

```
[Neuro Ai] 16:44:41 - [INFO]: DEPLOYMENT MODE
[Neuro Ai] 16:44:42 - [INFO]: Token successfully authenticated
[Neuro Ai] 16:44:42 - [INFO]: Using project: Default
[{'answer': 'smiljan', 'question': 'Where was Nikola Tesla raised?'}, {'answer': '', 'question': 'What were the name of his sisters?'}, {'answer': 'eastern orthodox', 'question': 'What religion was the priest?'}, {'answer': 'cholera', 'question': 'What was the major event that happened to Nikola?'}]

```

### BibTeX and Citation

This model was built by HuggingFace and the pre-trained model is publicly available at HuggingFace's model repository. Neuro provides instant infrastructure to allow access to their pre-trained model. Further information about the model has been extracted from HuggingFace's model repository.

```bibtex
@article{Sanh2019DistilBERTAD,
  title={DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter},
  author={Victor Sanh and Lysandre Debut and Julien Chaumond and Thomas Wolf},
  journal={ArXiv},
  year={2019},
  volume={abs/1910.01108}
}
```
