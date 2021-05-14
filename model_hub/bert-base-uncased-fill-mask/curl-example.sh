curl -X POST "https://api.neuro-ai.co.uk/SyncPredict?include_result=true" \
     -H "Accept:application/json" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer API_TOKEN" \
     -d '{"modelId":"609d5bed0421e5d2d7053403","data": ["The river is [MASK]."], "input_kwargs": {"top_k":3}}'