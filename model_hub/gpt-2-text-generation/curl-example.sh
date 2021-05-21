curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"60a7b5224ae13749d81605a0","data": "Hello my name is", "input_kwargs": {"number_of_tokens":10}}'