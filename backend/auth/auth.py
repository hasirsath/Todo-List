from flask import Blueprint, request, jsonify, current_app
import requests
from models.user import User
from db import db
import jwt
import datetime
from functools import wraps
import os

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # This check should be at the very top
        if request.method == 'OPTIONS':
            return jsonify({}), 200 # Or just `return '', 204`
        
        # ... your existing token checking logic here ...
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        # etc...
        return f(*args, **kwargs)
    return decorated


@auth_bp.route('/auth/register', methods=['POST'])
def register():
    print("Register endpoint hit")
    data = request.get_json()
    print("Received data:", data)
    email = data['email']
    password = data['password']


    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, current_app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token})

@auth_bp.route('/google-login', methods=['POST'])
def google_login():
    token = request.json.get('token')

    if not token:
        return jsonify({'error': 'Token missing'}), 400

    # Decode the token using Google API
    try:
        response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}')
        user_info = response.json()

        email = user_info['email']
        name = user_info.get('name', '')
        sub = user_info['sub']  # unique google user id

        # Check if user exists in DB (optional, pseudo logic)
        user = User.query.filter_by(email=email).first()
        if not user:
            # Create new user
            user = User(email=email, name=name, google_id=sub)
            db.session.add(user)
            db.session.commit()

        # Generate your app’s JWT token
        payload = {
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }
        your_token = jwt.encode(payload, os.getenv("SECRET_KEY"), algorithm="HS256")

        return jsonify({'token': your_token})

    except Exception as e:
        return jsonify({'error': str(e)}), 400