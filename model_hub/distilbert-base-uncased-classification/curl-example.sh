curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"60a3fd288b6a667ad9b2dee2","data": ["This is awesome"]}'