API_TOKEN="Insert here your API Token"
curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $API_TOKEN" \
     -d '{"modelId":"61bcad385829fb7b6a1faca2","data":"I met a traveller from an antique land, who said"}'