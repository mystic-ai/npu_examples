const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "60a7b5224ae13749d81605a0",
    data: ["Hello my name is"],
    input_kwargs: { number_of_tokens: 10 },
  }),
});
