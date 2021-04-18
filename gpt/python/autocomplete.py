import npu
import os
import numpy as np

npu.api(os.environ['API_TOKEN'], deployed=True)

input = "hello friend, how"
output = npu.predict("607c6efde90b1357d1d08059", 
    [[input]], 
    input_kwargs={
        "number_of_tokens" : 5
    }
    )[0]

print("Input: %s\nOutput: %s" % (input, output))