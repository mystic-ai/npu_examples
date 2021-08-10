API_TOKEN="Insert here you API Token"
curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $API_TOKEN" \
     -d '{"modelId":"60ca2a1e54f6ecb69867c72c","data": "When I visit Bath I will", "input_kwargs": {"response_length": 50, "remove_input":false}}'
     # response_length = how many response tokens to generate
     # remove_input = whether to return your input
     # all params from the transformers library `generate` function are supported
