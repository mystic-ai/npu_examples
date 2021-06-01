const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "60b65641cb49710df3af4866",
    data: ["When I visit Bath I will"],
    input_kwargs: { max_length: 15 },
  }),
});
