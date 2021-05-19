import npu

npu.api('API_TOKEN', deployed=True)

model_id = '60a40f81b635d67d627bf6b2'
data = ['When I visit Bath I will']

kwargs = {
    'max_length':15
}

output = npu.predict(model_id, data, kwargs)
print(output)