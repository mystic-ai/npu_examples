var fetch = require("node-fetch");

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer API_TOKEN",
  },
  body: JSON.stringify({
    modelId: "60950c8f178c4a48d9d3f533",
    data: ["When I visit Bath I will"],
    input_kwargs: { max_length: 20 },
  }),
});