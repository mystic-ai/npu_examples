import os
import base64

import npu

npu.api(os.environ["API_TOKEN"], deployed=False)

image = "input.jpg"

encoded_string = ""
with open(image, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

npu.predict('609a8ec379000ea09ac20525',[[encoded_string]], input_kwargs={"render_boxes": True})

