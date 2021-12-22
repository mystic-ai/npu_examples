API_TOKEN="Insert here your API Token"
curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $API_TOKEN" \
     -d '{"modelId":"61bcb317de464dfa00e0a2a7","data":[40, 1138, 257, 49130, 422, 281, 38504, 1956, 11, 508, 531]}'