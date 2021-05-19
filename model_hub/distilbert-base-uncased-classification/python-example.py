import npu

npu.api('API_TOKEN', deployed=True)

model_id = '60a3fd288b6a667ad9b2dee2'
data = ["This is awesome"]

output = npu.predict(model_id, data)
print(output)