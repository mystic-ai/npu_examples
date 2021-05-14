curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"609d45f40421e5d2d7053349","data": ["The car is blue"], "input_kwargs": {"from_lang": "en_XX", "to_lang": "es_XX"}}'