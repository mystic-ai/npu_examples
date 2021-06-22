API_TOKEN="Insert here you API Token"
curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $API_TOKEN" \
     -d '{"modelId":"60d1d2f1861efa57850507a7","data": "Hello how are you?", "input_kwargs": {"max_length": 50, "remove_input":false, "penalty":1.0}}'