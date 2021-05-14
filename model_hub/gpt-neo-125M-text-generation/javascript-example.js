var fetch = require("node-fetch");

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer API_TOKEN",
  },
  body: JSON.stringify({
    modelId: "609d50cb8b6a667ad9b2d9f6",
    data: ["When I visit Bath I will"],
    input_kwargs: { max_length: 15 },
  }),
});
