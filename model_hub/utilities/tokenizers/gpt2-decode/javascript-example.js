const API_TOKEN = ""; // Insert your API token from your dashboard

fetch("https://api.neuro-ai.co.uk/SyncPredict?include_result=true", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
  body: JSON.stringify({
    modelId: "61bcb317de464dfa00e0a2a7",
    data: [40, 1138, 257, 49130, 422, 281, 38504, 1956, 11, 508, 531], // token ids
  }),
});
