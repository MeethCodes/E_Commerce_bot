from flask import Blueprint, request, jsonify
print("inside append")

append_message_blueprint = Blueprint('append_message', __name__)

@append_message_blueprint.route('/process-message', methods=['POST'])
def process_message():
    print("inside process message fn")
    data = request.get_json()
    user_message = data['message']
    processed_message =  user_message
    print(f"this is the message = {processed_message}")
    return jsonify({'processed_message': processed_message})
