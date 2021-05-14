import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609d45f40421e5d2d7053349'
data = ['The car is blue']

kwargs = {
    'from_lang': "en_XX",
    'to_lang': "es_XX"
}

output = npu.predict(model_id, data, kwargs)
print(output)