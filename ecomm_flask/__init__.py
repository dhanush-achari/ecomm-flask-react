from flask import Flask
from .database import init_db
import dotenv, os

dotenv.load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
db = init_db(app)

from .routes import User



