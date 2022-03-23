fetch("https://api.pipeline.ai/v2/runs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer API_TOKEN",
  },
  body: JSON.stringify({
    "pipeline_id": "pipeline_d87bbe44742642658f232a9329041a52",
    "data": [
      "I met a traveller from an antique land, who said",
      {
        "response_length": 64,  // how many output tokens to generate
        "remove_input": false  // set to true if you want the response to include your input
        // all params from the transformers library `generate` function are supported
    },
    ]
  })
})
  .then(response => response.json())
  .then(run => console.log(run.result_preview))