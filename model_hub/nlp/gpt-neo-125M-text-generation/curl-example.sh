curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"60996ffa6a3a08b76f5a1b70","data": ["When I visit Bath I will"], "input_kwargs": {"max_length": 20}}'