from app import app
from flask import jsonify
import datetime
from flask import jsonify, redirect
from utils.helper import msgResponse
import jwt
from utils.models import User, db
from urllib.parse import quote_plus
from authlib.integrations.flask_client import OAuth
from utils.models import User, db


oauth = OAuth(app)

# prediction = model.predict([[3.16, 12, 7, 112, 35, 0, 0]])

oauth.register(
    'google',
    client_id='37984251697-66r9bectbdlsmd0ncsrq24njf4d1u4no.apps.googleusercontent.com',
    client_secret='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',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    client_kwargs={'scope': 'profile email'}
)

GOOGLE_REDIRECT_URL = 'http://localhost:4000/google/redirect'

google = oauth.google


@app.route("/users/<id>", methods=['GET'])
def hello_world(id):
    # id = request.args['id']
    if (id == None):
        return jsonify({'msg': 'bad request'}), 404

    user = db.session.get(User, id)

    return user.serialize()


@app.route('/google/login', methods=['GET'])
def google_login():
    return google.authorize_redirect(GOOGLE_REDIRECT_URL)

@app.route('/google/redirect', methods=['GET'])
def google_authorize():
    token = google.authorize_access_token()
    user = google.userinfo()
    print(user)
    oauth_data = oauth_authorize_user(user.email, user.name, '', '')
    oauth_data_string = quote_plus(str(oauth_data))
    print('JWT = ', oauth_data_string)
    return redirect(app.config['FRONTEND_URL'] + '/oauth/redirect?data=' + oauth_data_string)
    # return jsonify(user)

def oauth_authorize_user(email, name, mobile='', password=''):
    user = User.query.filter_by(email=email).first()
    if (user is None):
        user = User(name=name, email=email)
        try:
            db.session.add(user)
            db.session.commit()
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return msgResponse('Something went wrong'), 400
    payload={
        'type': 'OAUTH2_TOKEN',
        'id':user.id,
        'email': user.email,
        'name': user.name,
        'exp': datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload=payload, key=app.config['SECRET_KEY'])
    return {'user': {'id': user.id, 'email': user.email, 'mobile': '', 'name': user.name}, 'token': token}
