import cv2
import os
import io
import re

from google.cloud import vision
from google.cloud.vision import types
from google.protobuf.json_format import MessageToDict
from PIL import Image

from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(os.curdir, 'CalhackCV-a4f9f43dfda3.json')
client = vision.ImageAnnotatorClient()

def get_total(impath):
    # print(impath)
    # impath = os.path.join(os.getcwd(),impath)
    ocvimg = cv2.imread(impath,0)
    # print('hello')
    # cv2.imshow('img',ocvimg)
    width = 500
    height = 1000
    dim = (width, height)
    ocvimg = cv2.resize(ocvimg, dim, interpolation = cv2.INTER_AREA)
    ocvimg = cv2.adaptiveThreshold(ocvimg,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,11,15)


    cv2.imwrite('temp.jpg',ocvimg)

    with io.open('temp.jpg', 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    response_Org = client.document_text_detection(image=image)
    document = response_Org.text_annotations
    response = MessageToDict(response_Org)

    texts = response['textAnnotations'][0]['description']
    texts = re.split('\n| ',texts)

    num = []
    for eachI in range(len(texts)):
        temp = ''
        if '.' in texts[eachI]:
            temp = temp.join(c for c in texts[eachI] if c in '0123456789.')
            dotSplit = temp.split('.')
            # print(dotSplit)
            if len(dotSplit[1])==2 and len(dotSplit)==2 and len(dotSplit[0])<4:
                num.append(float(temp))
    if len(num)>0:
        return max(num)
    return -1

def get_all_path(folder):
    paths = []
    for filename in os.listdir(folder):
        pa = os.path.join(folder,filename)
        img = cv2.imread(pa,0)
        if img is not None:
            paths.append(pa)
    return paths
