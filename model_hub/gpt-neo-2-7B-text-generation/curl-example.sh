curl --X POST 'https://api.pipeline.ai/v2/runs' \
     --H 'Content-Type: application/json' \
     --H 'Accept: application/json' \
     --H 'Authorization: Bearer API_TOKEN' \
     --d '{
     "pipeline_id": "pipeline_94e07942aef04433b198ecba3ff56f88",
     "data": [
               "I met a traveller from an antique land, who said",
               {"response_length": 64, "remove_input": false}
          ]
     }'
     # response_length = how many output tokens to generate
     # remove_input = set to true if you want the response to include your input
     # all params from the transformers library `generate` function are supported