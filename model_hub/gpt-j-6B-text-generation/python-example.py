import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '60ca2a1e54f6ecb69867c72c'
data = ['When I visit Bath I will']

kwargs = {
    'max_length':15
}

output = npu.predict(model_id, data, kwargs)
print(output)