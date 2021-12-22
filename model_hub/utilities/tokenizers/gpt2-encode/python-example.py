import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '61bcad385829fb7b6a1faca2'
data = ["I met a traveller from an antique land, who said"]

output = npu.predict(model_id, data)
print(output)