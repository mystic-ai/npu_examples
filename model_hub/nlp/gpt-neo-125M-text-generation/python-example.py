# For Python users, install the Python `npu` package from pip. You can refer to our docs here[]

import npu

npu.api('API_TOKEN', deployed=True)

model_id = '60950c8f178c4a48d9d3f533'
data = [['When I visit Bath I will']]

args = {
    'max_length':20
}

output = npu.predict(model_id, data, args)
print(output)