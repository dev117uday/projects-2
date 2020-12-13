from PIL import Image
import pytesseract
from wand.image import Image as Img
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import RUS_PICKLE, pos_tag
import numpy as np
import shutil
import re
import os
import cv2
import time

# folder
if not os.path.exists('image_frames'):
    os.makedirs('image_frames')


test_vid = cv2.VideoCapture('video.mp4')


def run_ocr():
    text = ""
    index = 0

    while test_vid.isOpened():
        index = index + 1

        if index != 60:
            pass

        ret, frame = test_vid.read()
        if not ret:
            break

        # file name
        name = './image_frames/frame' + str(index) + '.png'

        if index == 60:
            print('Extracting frames...' + name)
            cv2.imwrite(name, frame)
            text = pytesseract.image_to_string(frame, lang='eng')
            time.sleep(2)
            break


    return text
