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
    input_kwargs: { max_new_tokens: 15 },
  }),
});
