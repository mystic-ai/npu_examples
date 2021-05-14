import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609d50cb8b6a667ad9b2d9f6'
data = ['When I visit Bath I will']

kwargs = {
    'max_length':15
}

output = npu.predict(model_id, data, kwargs)
print(output)