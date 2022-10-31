from app import app
from flask import jsonify

from utils.models import User, db

@app.route("/users/<id>", methods=['GET'])
def hello_world(id):
    # id = request.args['id']
    if (id == None):
        return jsonify({'msg': 'bad request'}), 404

    user = db.session.get(User, id)

    return user.serialize()