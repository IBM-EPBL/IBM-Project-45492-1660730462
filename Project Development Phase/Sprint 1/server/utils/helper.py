from random import randint

from flask import jsonify

def msgResponse(msg):
    return jsonify({'msg': msg})

def generateRandomNumber(n=6):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)