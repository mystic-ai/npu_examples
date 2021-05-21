import npu
import os
import numpy as np

npu.api(os.environ['API_TOKEN'], deployed=True)

input = "Hello my name is"

output = npu.predict("60a7b5224ae13749d81605a0", 
    [[input]], 
    input_kwargs={
        "number_of_tokens" : 10,
    }
    )[0]

print("Input: %s\nOutput: %s" % (input, output))