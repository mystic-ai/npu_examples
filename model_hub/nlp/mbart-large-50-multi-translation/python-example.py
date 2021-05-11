import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609970e86a3a08b76f5a1b72'
data = [['The car is blue']]

args = {
    'from_lang': "en_XX",
    'to_lang': "es_XX"
}

output = npu.predict(model_id, data, args)
print(output)