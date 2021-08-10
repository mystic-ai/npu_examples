import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '60ca2a1e54f6ecb69867c72c'
data = ['When I visit Bath I will']

kwargs = {
    'response_length': 50, # how many response tokens to generate
    'remove_input': False # whether to return your input
    # all params from the transformers library `generate` function are supported
}

output = npu.predict(model_id, data, kwargs)
print(output)
