import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

model_id = '61bcb317de464dfa00e0a2a7'
data = [[40, 1138, 257, 49130, 422, 281, 38504, 1956, 11, 508, 531]]

output = npu.predict(model_id, data)
print(output)