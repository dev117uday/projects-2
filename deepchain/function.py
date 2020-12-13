from hashlib import sha256
from uuid import uuid4
from google.cloud import storage
from google.cloud import speech


def updateHash(*args):
    """ Takes the information and produces a 64-bit long string"""

    hash_text = ""
    h = sha256()

    for arg in args:
        hash_text += str(arg)

    h.update(hash_text.encode('utf-8'))
    return h.hexdigest()


def generate_token():
    """ Function to generate a new uuid4 token """

    new_token = uuid4()
    return new_token


def cloud_storage_uploader(file):
    """ upload file to google storage bucket for speech to text API to work """
    bucket_name = "deepchain"
    random_token = uuid4()
    filename = str("%s-%s" % (random_token, file.filename))
    gcs = storage.Client()
    bucket = gcs.get_bucket(bucket_name)
    blob = bucket.blob(filename)
    blob.upload_from_string(
        file.read(),
        content_type=file.content_type
    )

    return blob.public_url


def video_to_speech(gcp_url):

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcp_url)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code="en-US",
    )

    # For debig purpose only
    print("Waiting for operation to complete...")
    response = client.recognize(config=config, audio=audio)
    print("Operation complete")
    return useful_response(response)


def useful_response(response):

    dict = {}

    for result in response.results:
        best_alternative = result.alternatives[0]
        transcript = best_alternative.transcript
        confidence = best_alternative.confidence
        dict["Transcript"] = transcript
        dict["Confidence"] = confidence

    return dict


def clean_string(text):
    x = text.split("'")
    text = " ".join([str(elem) for elem in x])
    return text
