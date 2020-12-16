from psycopg2.extensions import JSON
from db import *
from flask import Flask, request
from flask.wrappers import Request, Response
from blockchain import Block, Blockchain
from function import clean_string, cloud_storage_uploader, video_to_speech
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
create_db()

# for debug purpose only


@app.route("/admin/get_all_db")
def get_all_db():
    """For debug prupose only"""

    records = get_all_from_db()
    return records


@app.route("/")
def hello():
    """ To check the server started successfully"""
    return "hello"


@app.route("/by_token", methods=['POST'])
def get_node_from_token():
    """ Verify the msg using token """
    json_obj = request.get_json()
    token = json_obj['token']
    print(token)
    answer, code = get_db_from_token(token)
    if code == 1:
        return answer, 404
    return answer, 200


@app.route("/generate_token")
def generate_token():
    """ Generate new token """
    token = generate_token_service()
    return {"token": token}


@app.route("/save_video", methods=['POST'])
def video():
    """ to save the video to chain """
    last_record = get_last_row()
    if last_record == False:
        return "Please generate a token first and then talk", 406
    elif last_record[4] != None:
        return "Generate a new token please", 400

    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return 'No file uploaded.', 400

    file_url = cloud_storage_uploader(uploaded_file)
    file_url = "gs://"+file_url[31:]
    response_trans = video_to_speech(file_url)

    data = clean_string(response_trans['Transcript'])

    blockchain = Blockchain()
    blockchain.mine(
        Block(data, last_record[2]), last_record)
    return response_trans


if __name__ == '__main__':
    """ entry point """
    app.run(debug=True)
