import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '60b65641cb49710df3af4866'
data = ['When I visit Bath I will']

kwargs = {
    'max_length':15
}

output = npu.predict(model_id, data, kwargs)
print(output)