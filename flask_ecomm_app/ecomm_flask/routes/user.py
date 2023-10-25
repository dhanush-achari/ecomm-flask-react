from ecomm_flask import app,db
from flask import request, jsonify, session
from ..models import User
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user,LoginManager,login_required,current_user
import pyotp
from .emailer import send_email

#Login required decorator

login_manager = LoginManager()
login_manager.init_app(app)

bcrypt = Bcrypt(app)
@login_manager.user_loader
def user_loader(user_id):
    print(user_id,"user loader")
    return User.query.get(int(user_id))

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
    print(data)
    username = data["username"]
    password = data["password"]
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        # session["user_id"] = user.id
        user_id = user.id
        totp = pyotp.TOTP(pyotp.random_base32())
        otp = totp.now()
        user.totp = otp
        send_email(user.email, otp)
        db.session.add(user)
        db.session.commit()
        return jsonify({"user_id":user_id,"message": "User verified"}),200
    else:
        return jsonify({"message": "Invalid email or password"}),401

@app.route("/otp_login", methods=["POST","GET"])
def otp_login():
    print(request.get_json())
    print(session.get("user_id"))
    data = request.get_json()
    if User.query.get(int(data["user_id"])):
        # user_id = session.get("user_id")
        user = User.query.get(int(data["user_id"]))
        otp = data["otp"]
        if user.totp==otp:
            if login_user(user,remember=True):
                # print(current_user)
                user.authenticated = True
                user.totp = None
                db.session.add(user)
                db.session.commit()
                return jsonify({"message": "User logged in successfully"}),200
            else:
                return jsonify({"message": "Login failed"}),401
        else:
            return jsonify({"message": "Invalid OTP"}),401
    else:
        return jsonify({"message": "User not registered"}),401
#change password route
@app.route("/change_password", methods=["POST"])
@login_required
def change_password():
    data = request.get_json()
    old_password = data["old_password"]
    new_password = data["new_password"]
    user = User.query.filter_by(id=current_user.id).first()
    if user and bcrypt.check_password_hash(user.password, old_password):
        user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Password changed successfully"}),200
    else:
        return jsonify({"message": "Invalid old password"}),401

@app.route("/logout",methods=["GET"])
@login_required
def logout():
    user = current_user
    print(current_user)
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return jsonify({"message": "User logged out successfully"}),200

