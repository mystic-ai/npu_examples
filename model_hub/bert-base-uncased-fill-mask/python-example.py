import npu

npu.api('API_TOKEN', deployed=True)

model_id = '6099865556881aa06421af74'
data = [["The river is [MASK]."]]

args = {
    'top_k':3, # How many outputs you want
}

output = npu.predict(model_id, data, args)
print(output)