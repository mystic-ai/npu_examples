var fetch = require("node-fetch");

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer API_TOKEN",
  },
  body: JSON.stringify({
    modelId: "609d45f40421e5d2d7053349",
    data: ["The car is blue"],
    input_kwargs: { from_lang: "en_XX", to_lang: "es_XX" },
  }),
});
