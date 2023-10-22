from ecomm_flask import app,db
from flask import request, jsonify
from ..models import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

#User registration route with password encryption using bcrypt
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(username = username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}),201

#User Login route with password encryption using bcrypt
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "User logged in successfully"}),200
    else:
        return jsonify({"message": "Invalid email or password"}),401
