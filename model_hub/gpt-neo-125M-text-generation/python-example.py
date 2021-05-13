import npu

npu.api('API_TOKEN', deployed=True)

model_id = '60996ffa6a3a08b76f5a1b70'
data = [['When I visit Bath I will']]

args = {
    'max_length':20
}

output = npu.predict(model_id, data, args)
print(output)