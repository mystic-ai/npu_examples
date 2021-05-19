const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "60a3fd288b6a667ad9b2dee2",
    data: ["The river is [MASK]."],
    input_kwargs: { top_k: 3 },
  }),
});
