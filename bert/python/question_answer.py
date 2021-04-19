import npu
import os
import numpy as np

npu.api(os.environ['API_TOKEN'], 'bert', deployed=False)

model = npu.compile('question_answer.py', library="FILE", scripts=["bert_question_answer_prediction_srv"])

question = "Who was Jim Henson?"
sample_text = "Jim Henson was a nice puppet"

output = npu.predict(model, 
    [[question, sample_text]], 
    input_kwargs={}
    ).get_result()

print("Question: %s\nSample: %s\nOutput: %s" % (question, sample_text, output))