from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from routes import register_routes
from models import db

# Create and configure the app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Bind db to app (Flask_SQLAlchemy)
db.init_app(app)

# Initialize flask-migrate
migrate = Migrate(app, db)

# Create missing tables
with app.app_context():
    db.create_all()

# Retrieve and register API routes
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
