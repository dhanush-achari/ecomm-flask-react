from ecomm_flask import db 
from ecomm_flask import app

#user model for database
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)

    def __init__(self,username,password,email) -> None:
        self.username = username
        self.password = password
        self.email = email 

    def __repr__(self) -> str:
        return f"<User {self.username}>"
    
    def is_active(self):
        return True
    
    def is_authenticated(self):
        return self.authenticated
    
    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        print(str(self.id),"user model")
        return str(self.id) #this funtion shuld return only str according docs
    
    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False
# with app.app_context():
#     db.create_all()