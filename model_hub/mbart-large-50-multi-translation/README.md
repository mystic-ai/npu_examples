# MBart Large 50

#### Tags

> ['Translation']['multilingual']

### Model Description

This model is a fine-tuned checkpoint of mBART-large-50. mbart-large-50-many-to-many-mmt is fine-tuned for multilingual machine translation. It was introduced in [Multilingual Translation with Extensible Multilingual Pretraining and Finetuning](https://arxiv.org/abs/2008.00401) paper.

The model can translate directly between any pair of 50 languages. The languages are: Arabic (ar_AR), Czech (cs_CZ), German (de_DE), English (en_XX), Spanish (es_XX), Estonian (et_EE), Finnish (fi_FI), French (fr_XX), Gujarati (gu_IN), Hindi (hi_IN), Italian (it_IT), Japanese (ja_XX), Kazakh (kk_KZ), Korean (ko_KR), Lithuanian (lt_LT), Latvian (lv_LV), Burmese (my_MM), Nepali (ne_NP), Dutch (nl_XX), Romanian (ro_RO), Russian (ru_RU), Sinhala (si_LK), Turkish (tr_TR), Vietnamese (vi_VN), Chinese (zh_CN), Afrikaans (af_ZA), Azerbaijani (az_AZ), Bengali (bn_IN), Persian (fa_IR), Hebrew (he_IL), Croatian (hr_HR), Indonesian (id_ID), Georgian (ka_GE), Khmer (km_KH), Macedonian (mk_MK), Malayalam (ml_IN), Mongolian (mn_MN), Marathi (mr_IN), Polish (pl_PL), Pashto (ps_AF), Portuguese (pt_XX), Swedish (sv_SE), Swahili (sw_KE), Tamil (ta_IN), Telugu (te_IN), Thai (th_TH), Tagalog (tl_XX), Ukrainian (uk_UA), Urdu (ur_PK), Xhosa (xh_ZA), Galician (gl_ES), Slovene (sl_SI).

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import npu

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '609d45f40421e5d2d7053349'
data = ['The car is blue']

kwargs = {
    'from_lang': "en_XX",
    'to_lang': "es_XX"
}

output = npu.predict(model_id, data, kwargs)
print(output)
```

If you run the script above, in your terminal you will see the following,

```
[Neuro Ai] 16:02:25 - [INFO]: DEPLOYMENT MODE
[Neuro Ai] 16:02:25 - [INFO]: Token successfully authenticated
[Neuro Ai] 16:02:25 - [INFO]: Using project: Default
[{'translated_text': ['El auto es azul.']}]
```

### BibTeX and Citation

This model was built by Facebook AI and the pre-trained model is publicly available at HuggingFace's model repository. Neuro provides instant infrastructure to allow access to their pre-trained model. Further information about the model has been extracted from HuggingFace's model repository.

```bibtex
@article{tang2020multilingual,
    title={Multilingual Translation with Extensible Multilingual Pretraining and Finetuning},
    author={Yuqing Tang and Chau Tran and Xian Li and Peng-Jen Chen and Naman Goyal and Vishrav Chaudhary and Jiatao Gu and Angela Fan},
    year={2020},
    eprint={2008.00401},
    archivePrefix={arXiv},
    primaryClass={cs.CL}
}
```
