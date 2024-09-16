from flask import Flask
from routes.append_message import append_message_blueprint
from routes.post_prc_scraped_content import post_prc_scraped_content_blueprint
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(append_message_blueprint)
app.register_blueprint(post_prc_scraped_content_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
