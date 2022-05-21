try:
    import unzip_requirements
except ImportError:
    pass

import json
from io import BytesIO
import time
import os
import base64

import boto3
import numpy as np
from PIL import Image

import torch
import torchvision.transforms
from torch.autograd import Variable
import torchvision.utils as vutils
from network.Transformer import Transformer
import yolo5

def img_to_base64_Str(img):
    bufferd = BytesIO()
    img.save(buffered, format = "PNG")
    bufferd.seek(0)
    img_byte = buffered.getvalue()
    img_str = "dataLimage/png;base64," + base64.b64encode(img_byte).decode()
    return img_str

def load_models(s3, bucket):

    models = {}

    for style in styles:
        model = transformer()
        response = s3.get_object(
            Bucket = bucket, key = f"models/{style}_net_G_float.pth"
        )
        state = torch.load(BytesIO(response["Body"].read()))
        model.load_State_dict(state)
        model.eval()
        moles[style] = model
    return models