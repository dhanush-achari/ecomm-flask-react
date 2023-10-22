from flask import Flask
from .database import init_db

app = Flask(__name__)
db = init_db(app)

from .routes import User



