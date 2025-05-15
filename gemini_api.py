# To run this code you need to install the following dependencies:
# pip install google-genai flask python-dotenv flask-cors markdown bleach

import os
import mimetypes
import asyncio
import markdown
import bleach
from google import genai
from google.genai import types
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Ensure proper MIME types are registered
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')
mimetypes.add_type('image/svg+xml', '.svg')

app = Flask(__name__)
CORS(app)

@app.route('/api/generate', methods=['POST'])
def api_generate():
    data = request.json
    query = data.get('query', '')
    method = data.get('method', 'Search')
    result = generate(query, method)
    return jsonify({"result": result})

@app.route('/<path:path>')
def serve_static(path):
    try:
        mime_type = mimetypes.guess_type(path)[0]
        if mime_type:
            with open(path, 'rb') as f:
                return Response(f.read(), mimetype=mime_type)
        return send_file(path)
    except Exception as e:
        return f"Error serving {path}: {str(e)}", 404

@app.route('/')
def serve_index():
    return send_file('index.html')

def generate(query, method="Search"):
    try:
        # Set up event loop
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

        # Initialize client
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
        model = "gemini-1.5-flash"

        # Future-ready prompt strategy
        # Base template that can be easily extended with new methods
        prompt_templates = {
            "Search": "Provide comprehensive information about: {query}",
            "Reason": "Explain the reasoning and analysis behind: {query}",
            "Deep research": "Conduct detailed research on: {query}",
            "Create image": "Describe a visual representation of: {query}",
            # Additional methods can be added here without changing core logic
            "Summarize": "Provide a concise summary of: {query}",
            "Compare": "Compare and contrast the following: {query}"
        }

        # Get template or use default if method not found
        prompt_template = prompt_templates.get(method, "Analyze: {query}")

        # Format the prompt (allows for future template variables)
        prompt = prompt_template.format(query=query)

        # Prepare content for API call
        contents = [types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)],
        )]

        # Get response
        raw_response = client.models.generate_content(
            model=model,
            contents=contents,
            config=types.GenerateContentConfig(response_mime_type="text/plain"),
        ).text

        # Process response (consistent across all methods)
        sanitized_text = bleach.clean(raw_response)
        html_response = markdown.markdown(
            sanitized_text,
            extensions=[
                'markdown.extensions.fenced_code',
                'markdown.extensions.tables',
                'markdown.extensions.nl2br',
                'markdown.extensions.sane_lists'
            ]
        )

        return {
            "text": raw_response,
            "html": html_response
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"Error: {str(e)}"

# For local development
if __name__ == "__main__":
    port = 8081
    print(f"Server running at http://localhost:{port}")
    print("Press Ctrl+C to quit")
    app.run(debug=True, port=port, threaded=True, host='0.0.0.0')

# For Vercel serverless deployment - export the Flask app
# This line is needed for Vercel to detect the app
app = app