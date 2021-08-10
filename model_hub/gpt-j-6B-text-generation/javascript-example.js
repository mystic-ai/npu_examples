const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "60ca2a1e54f6ecb69867c72c",
    data: "When I visit Bath I will",
    input_kwargs: { response_length: 50, remove_input: false },
    // response_length = how many response tokens to generate
    // remove_input = whether to return your input
    // all params from the transformers library `generate` function are supported
  }),
});
