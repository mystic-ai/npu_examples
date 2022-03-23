from pipeline import PipelineCloud

api = PipelineCloud("API_TOKEN")

run = api.run_pipeline(
    "pipeline_47ace5e91c1742fc9aa41e72a52a5020",
    [
        "I met a traveller from an antique land, who said",
        {
            "response_length": 64,  # how many output tokens to generate
            "remove_input": False  # set to True if you want the response to include your input
            # all params from the transformers library `generate` function are supported
        },
    ],
)

print(run["result_preview"])
