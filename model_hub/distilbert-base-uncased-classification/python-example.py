import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609d67b30421e5d2d7053496'
data = ["This is awesome"]

output = npu.predict(model_id, data)
print(output)