from flask import Flask, request, render_template_string
import base64
import requests
import json  # Import json for pretty printing
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# OpenAI API Key
api_key = ""


# Function to encode the image
@app.route("/")
def home():
    # Basic form for file upload
    return """
    <form method="post" action="/analyze" enctype="multipart/form-data">
        <input type="file" name="image">
        <input type="submit">
    </form>
    """


@app.route("/image2ingredient", methods=["POST"])
def analyze_image():
    if "image" not in request.files:
        return "No file part"
    file = request.files["image"]
    if file.filename == "":
        return "No selected file"
    if file:
        base64_image = base64.b64encode(file.read()).decode("utf-8")

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        }

        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": '"Please analyze the image to identify the ingredients in the fridge and list them in JSON format similar to {"contents": ["ingredient1", "ingredient2", "ingredient3"]}. If you cannot idetify any ingredients, please return an empty JSON object. DO NOT include any other text in the response."',
                        },
                        {
                            "type": "image",
                            "image_url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    ],
                }
            ],
            "max_tokens": 900,
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
        )
        response_data = response.json()

        # print("response data", response_data)

        # Extract the ingredients text from the response

        print(response_data)
        if (
            response_data
            and "choices" in response_data
            and len(response_data["choices"]) > 0
        ):
            content_text = response_data["choices"][0]["message"]["content"]
            # Extract the JSON string from the content
            json_start = content_text.find("{")
            json_end = content_text.rfind("}") + 1
            ingredients_json = content_text[json_start:json_end]

            print("ingredients", ingredients_json)
            return ingredients_json
        else:
            return "Error: Unable to extract ingredients"


@app.route("/ingredient2recipe", methods=["POST"])
def ingredent2Recipe():  # ingredients
    if request.json.get("ingredients") == "":
        return "Nothing Given"

    ingredients = request.json.get("ingredients")["contents"]
    if ingredients is None:
        return ""

    str_ingredents = ""

    for i in ingredients:
        str_ingredents += i + ", "

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Given the ingredients: "
                        + str_ingredents
                        + '. Genereate a list of recipes, ingredients used, outstanding ingredient for the recipe as a JSON object similar to: {"content":[{"title":"NAME", "ingredients":["ingrediant1", "ingrediant2", "ingrediant3"], "steps": ["step1", "step2", "step3"]},{"title":"NAME", "ingredients":["ingrediant1", "ingrediant2", "ingrediant3"], "steps": ["step1", "step2", "step3"]}]}',
                    }
                ],
            }
        ],
        "max_tokens": 900,
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )

    response_data = response.json()
    if (
        response_data
        and "choices" in response_data
        and len(response_data["choices"]) > 0
    ):
        content_text = response_data["choices"][0]["message"]["content"]
        print("content_text")
        # Extract the JSON string from the content
        json_start = content_text.find("{")
        json_end = content_text.rfind("}") + 1
        ingredients_json = content_text[json_start:json_end]

        print("ingredients", ingredients_json)
        test = ingredients_json
        return test
    else:
        return "Error: Unable to extract ingredients"


if __name__ == "__main__":
    app.run(debug=True, port=8000)
