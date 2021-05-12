import os
import base64

from PIL import Image
from io import BytesIO

import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

#npu_model = npu.compile('input.jpg', library="FILE", model_label="clip", scripts=["clip_prediction_srv"])

image = "input.jpg"

encoded_string = ""
with open(image, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

input = [[encoded_string]]
phrases = ["a diagram", "of photo of a dog", "a horse"]

result_response = npu.predict('609c32318b6a667ad9b2d8e5', input, input_kwargs={"phrases": phrases})

print(result_response)
