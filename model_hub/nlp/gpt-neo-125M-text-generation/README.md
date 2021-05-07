# GPT-Neo-125M

### Tags

['Text Generation']

### Model Description

GPT-Neo 125M is a transformer model designed using EleutherAI's replication of the GPT-3 architecture. GPT-Neo refers to the class of models, while 125M represents the number of parameters of this particular pre-trained model.

### Training Procedure

This model was trained for 400,000 steps on the Pile. It was trained as a masked autoregressive language model, using cross-entropy loss.

### Limitations and Biases

GPT-Neo was trained as an autoregressive language model. This means that its core functionality is taking a string of text and predicting the next token. While language models are widely used for tasks other than this, there are a lot of unknowns with this work.

GPT-Neo was trained on the Pile, a dataset known to contain profanity, lewd, and otherwise abrasive language. Depending on your usecase GPT-Neo may produce socially unacceptable text. See Sections 5 and 6 of the Pile paper for a more detailed analysis of the biases in the Pile.

As with all language models, it is hard to predict in advance how GPT-Neo will respond to particular prompts and offensive content may occur without warning. We recommend having a human curate or filter the outputs before releasing them, both to censor undesirable content and to improve the quality of the results.

### BibTeX and Citation

This model was built by EleutherAI under MIT License. Neuro provides instant infrastructure to allow access to their pre-trained model. Further information about the model has been extracted from HuggingFace's open-source model repository.

```bibtex
@article{gao2020pile,
  title={The Pile: An 800GB Dataset of Diverse Text for Language Modeling},
  author={Gao, Leo and Biderman, Stella and Black, Sid and Golding, Laurence and Hoppe, Travis and Foster, Charles and Phang, Jason and He, Horace and Thite, Anish and Nabeshima, Noa and others},
  journal={arXiv preprint arXiv:2101.00027},
  year={2020}
}
```
