import npu

npu.api('API_TOKEN', deployed=True)

model_id = '609d62068b6a667ad9b2da20'
data = ["The river is [MASK]."]

kwargs = {
    'top_k':3,
}

output = npu.predict(model_id, data, kwargs)
print(output)