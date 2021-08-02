import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '60ca2a1e54f6ecb69867c72c'
data = ['When I visit Bath I will']

kwargs = {
    'max_new_tokens': 25, # how many new tokens to generate REQUIRED
    # 'max_length': 160,
    # 'penalty': 1.0,
    # 'top_p': 0.92,
    # 'top_k': 0,
    # 'temperature': 0.8,
    # 'remove_input': False
}

output = npu.predict(model_id, data, kwargs)
print(output)
