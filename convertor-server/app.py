import os
from flask import Flask, request
from function import *
from ocr import *
import requests 
import time
app = Flask(__name__)


@app.route('/get_token', methods=['GET', 'POST'])
def upload_file():
    obbj = request.get_json()
    url = obbj['gcs_url']
    print(url)
    r = requests.get(url)

    with open("video.mp4",'wb') as f: 
        f.write(r.content) 

    answer = run_ocr()
    print(answer)
    return answer

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
