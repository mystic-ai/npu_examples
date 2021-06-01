const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "60b6578da4585d36792e32f9",
    data: ["When I visit Bath I will"],
    input_kwargs: { max_length: 15 },
  }),
});
