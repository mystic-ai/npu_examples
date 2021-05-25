import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '60a3c2a00421e5d2d7053ab9'
data = ["The river is [MASK]."]

kwargs = {
    'top_k':3, # How many predictions do you want
}

output = npu.predict(model_id, data, kwargs)
print(output)