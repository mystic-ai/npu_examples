API_TOKEN="Insert here you API Token"
curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $API_TOKEN" \
     -d '{"modelId":"60a3c2a00421e5d2d7053ab9","data": ["The river is [MASK]."], "input_kwargs": {"top_k":3}}'