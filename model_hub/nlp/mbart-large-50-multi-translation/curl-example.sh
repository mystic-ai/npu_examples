curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"609970e86a3a08b76f5a1b72","data": ["The car is blue"], "input_kwargs": {"from_lang": "en_XX", "to_lang": "es_XX"}}'