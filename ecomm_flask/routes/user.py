from ecomm_flask import app,db
from flask import request, jsonify
from ..models import User
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user,LoginManager,login_required,current_user


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
    username = data["username"]
    password = data["password"]
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        if login_user(user,remember=True):
            # print(current_user)
            user.authenticated = True
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User logged in successfully"}),200
        else:
            return jsonify({"message": "Login failed"}),401
    else:
        return jsonify({"message": "Invalid email or password"}),401

@app.route("/logout",methods=["GET"])
@login_required
def logout():
    user = current_user
    print(current_user)
    user.is_authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return jsonify({"message": "User logged out successfully"}),200

