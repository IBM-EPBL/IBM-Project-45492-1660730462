from random import randint
import functools
import jwt
import random
import string

from flask import jsonify, request, abort, g, current_app
from .prediction import DataSet
from .metadata import MetaData


app = current_app

def msgResponse(msg):
    return jsonify({'msg': msg})

def generateRandomNumber(n=6):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

def process_metadata():
    metadata = MetaData()
    dataset = DataSet()
    metadata.set_data('dataset_column_mapping', dataset.get_mapping())
    return metadata.get_metadata()

def token_required(f):
  @functools.wraps(f)
  def decorated_function(*args, **kwargs):
    authToken = request.headers.get('Authorization')
    if(authToken is not None):
        try:
            decoded = jwt.decode(authToken[7:], app.config['SECRET_KEY'], 'HS256')
            g.userId = decoded.get('id')
            g.userName = decoded.get('name')
            g.userEmail = decoded.get('email')
            return f(*args, **kwargs)
        except jwt.exceptions.DecodeError as e:
            print(e)
            return "", 401
        
        except jwt.exceptions.ExpiredSignatureError as e:
            print(e)
            return "", 401
    else:
        return "", 401
  return decorated_function

def cm2inch(*tupl):
    inch = 2.54
    if isinstance(tupl[0], tuple):
        return tuple(i/inch for i in tupl[0])
    else:
        return tuple(i/inch for i in tupl)

def date_str_from_datetime_obj(d):
    return d.strftime('%d/%m/%Y')

def generate_random_string(n):
    res = ''.join(random.choices(string.ascii_uppercase +
                            string.digits, k=n))
    return res