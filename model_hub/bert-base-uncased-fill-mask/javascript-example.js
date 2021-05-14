var fetch = require("node-fetch");

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer API_TOKEN",
  },
  body: JSON.stringify({
    modelId: "609d62068b6a667ad9b2da20",
    data: ["The river is [MASK]."],
    input_kwargs: { top_k: 3 },
  }),
});
