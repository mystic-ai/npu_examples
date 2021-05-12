import os
import base64

from PIL import Image
from io import BytesIO

import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

image = "input.jpg"

encoded_string = ""
with open(image, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

result_response = npu.predict('609ba35e0421e5d2d7052e9f',[[encoded_string]], input_kwargs={"render_boxes": True})[0]

result = result_response.encode('latin-1')
imgdata = base64.b64decode(result)

stream = BytesIO(imgdata)

image = Image.open(stream).convert("RGBA")
image.show()