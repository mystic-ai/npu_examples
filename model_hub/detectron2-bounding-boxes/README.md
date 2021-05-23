# Detectron2 for Object Recognition

#### Tags

> ['Object Recognition']

### Model Description

Detectron2 is Facebook AI Research's next generation library
that provides state-of-the-art detection and segmentation algorithms.
It is the successor of
[Detectron](https://github.com/facebookresearch/Detectron/)
and [maskrcnn-benchmark](https://github.com/facebookresearch/maskrcnn-benchmark/).
It supports a number of computer vision research projects and production applications in Facebook.

### How to use it

To use this model as an API you will need your API Token. You can find it in the homepage of Neuro's Dashboard. If you don't have a Neuro account, you can register in the [Neuro Dashboard](https://dashboard.getneuro.ai/) and upgrade your account to either Developer or Premium to be able to use this model inmediately.

You will need the `npu` library which you can install with `pip install --upgrade npu`

Using your API Token, this is all the code you need to run the model.

```python
import os
import base64
import npu

from PIL import Image
from io import BytesIO

npu.api('API_TOKEN', deployed=True) # Change API_TOKEN with your personal API token

model_id = '609e7716b635d67d627be711'

image = "input.jpg"

encoded_string = ""
with open(image, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

result_response = npu.predict(model_id,[[encoded_string]], input_kwargs={"render_boxes": True})[0]

result = result_response.encode('latin-1')
imgdata = base64.b64decode(result)
stream = BytesIO(imgdata)
image = Image.open(stream).convert("RGBA")
image.show()
```

### Training Procedure

The Detectron2 deployed model used here is the mask_rcnn_R_50_FPN_3x pretrained model.

### BibTeX and Citation

Detectron2 is released under the Apache 2.0 license. Neuro provides instant infrastructure to allow access to their pre-trained model.

```bibtex
@misc{wu2019detectron2,
  author =       {Yuxin Wu and Alexander Kirillov and Francisco Massa and
                  Wan-Yen Lo and Ross Girshick},
  title =        {Detectron2},
  howpublished = {\url{https://github.com/facebookresearch/detectron2}},
  year =         {2019}
}
```
