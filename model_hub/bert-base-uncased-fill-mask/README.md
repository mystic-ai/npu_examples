# BERT-base-uncased for Fill-Mask

#### Tags

> ['Fill-Mask']

### Model Description

Pretrained model on English language using a masked language modeling (MLM) objective. It was introduced in [this paper](https://arxiv.org/abs/1810.04805) and first released in [this repository](https://github.com/google-research/bert). This model is uncased: it does not make a difference between english and English.

BERT is a transformers model pretrained on a large corpus of English data in a self-supervised fashion. This means it was pretrained on the raw texts only, with no humans labelling them in any way (which is why it can use lots of publicly available data) with an automatic process to generate inputs and labels from those texts. More precisely, it was pretrained with two objectives:

- Masked language modeling (MLM): taking a sentence, the model randomly masks 15% of the words in the input then run the entire masked sentence through the model and has to predict the masked words. This is different from traditional recurrent neural networks (RNNs) that usually see the words one after the other, or from autoregressive models like GPT which internally mask the future tokens. It allows the model to learn a bidirectional representation of the sentence.
- Next sentence prediction (NSP): the models concatenates two masked sentences as inputs during pretraining. Sometimes they correspond to sentences that were next to each other in the original text, sometimes not. The model then has to predict if the two sentences were following each other or not.

This way, the model learns an inner representation of the English language that can then be used to extract features useful for downstream tasks: if you have a dataset of labeled sentences for instance, you can train a standard classifier using the features produced by the BERT model as inputs.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '60a3c2a00421e5d2d7053ab9'

data = ["The river is [MASK]."]

kwargs = {
    'top_k':3, # How many predictions do you want
}

output = npu.predict(model_id, data, kwargs)
print(output)
```

If you run the script above, in your terminal you will see the following,

```
[Neuro Ai] 17:03:55 - [INFO]: DEPLOYMENT MODE
[Neuro Ai] 17:03:55 - [INFO]: Token successfully authenticated
[Neuro Ai] 17:03:55 - [INFO]: Using project: Default
[[{'score': 0.15081670880317688, 'sequence': 'the river is navigable.', 'token': 28538, 'token_str': 'navigable'}, {'score': 0.1100989431142807, 'sequence': 'the river is intermittent.', 'token': 23852, 'token_str': 'intermittent'}, {'score': 0.0810202956199646, 'sequence': 'the river is perennial.', 'token': 14638, 'token_str': 'perennial'}]]
```

### BibTeX and Citation

This model was built by Google and the pre-trained model is publicly available at HuggingFace's model repository. Neuro provides instant infrastructure to allow access to their pre-trained model. Further information about the model has been extracted from HuggingFace's model repository.

```bibtex
@article{DBLP:journals/corr/abs-1810-04805,
  author    = {Jacob Devlin and
               Ming{-}Wei Chang and
               Kenton Lee and
               Kristina Toutanova},
  title     = {{BERT:} Pre-training of Deep Bidirectional Transformers for Language
               Understanding},
  journal   = {CoRR},
  volume    = {abs/1810.04805},
  year      = {2018},
  url       = {http://arxiv.org/abs/1810.04805},
  archivePrefix = {arXiv},
  eprint    = {1810.04805},
  timestamp = {Tue, 30 Oct 2018 20:39:56 +0100},
  biburl    = {https://dblp.org/rec/journals/corr/abs-1810-04805.bib},
  bibsource = {dblp computer science bibliography, https://dblp.org}
}
```
