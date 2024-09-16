from flask import Blueprint, request, jsonify

append_message_blueprint = Blueprint('append_message', __name__)

@append_message_blueprint.route('/process-message', methods=['POST'])
def process_message():
    data = request.get_json()
    user_message = data['message']
    processed_message = user_message
    return jsonify({'processed_message': processed_message})
