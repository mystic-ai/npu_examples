curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"60a50d0fbcfe327d47f4127a", "data": "article to process"'