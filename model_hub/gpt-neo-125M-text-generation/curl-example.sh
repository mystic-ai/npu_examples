curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"609d50cb8b6a667ad9b2d9f6","data": ["When I visit Bath I will"], "input_kwargs": {"max_length": 15}}'