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

# Rendering in HTML example

with open("response.html", 'w') as file_html:
    file_html.write(
        '''
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>title</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <img src="data:image/jpg;base64, %s" alt="Fail!!"/>
  </body>
</html>
        ''' % result_response
    )