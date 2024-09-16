from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import os
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Access the API key
GROQ_API_KEY = os.getenv('GROQ_CLOUDS_API_KEY')

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Create a Blueprint for this route
post_prc_scraped_content_blueprint = Blueprint('post_prc_scraped_content', __name__)

# Global variable to store scraped content
scraped_content = ""

# Function to get a response from the LLM
def get_llm_response(prompt):
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        model="llama3-8b-8192",  # Replace with the appropriate model name
        max_tokens=150
    )
    return response.choices[0].message.content.strip()

@post_prc_scraped_content_blueprint.route('/process_content', methods=['POST'])
def process_content():
    global scraped_content
    content = request.json
    scraped_content = content.get('document', '').strip()

    if not scraped_content:
        return jsonify({
            'status': 'error',
            'response': 'No content received'
        })

    return jsonify({
        'status': 'success',
        'response': 'Content received and stored'
    })

@post_prc_scraped_content_blueprint.route('/ask_question', methods=['POST'])
def ask_question():
    global scraped_content
    data = request.json
    user_message = data.get('query', '').strip()

    if not user_message or not scraped_content:
        return jsonify({
            'status': 'error',
            'response': 'Sorry, something went wrong!'
        })

    # Prepare the prompt for the LLM
    prompt = f"Hey, this is a doc: {scraped_content}. I want you to remember it and answer questions based on that content but keep your answers as short as possible. Here is the question: {user_message}"

    # Call the LLM model with the prompt
    response = get_llm_response(prompt)

    return jsonify({
        'status': 'success',
        'response': response
    })
