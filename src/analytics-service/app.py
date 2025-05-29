from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

from routes.portfolio_stats import portfolio_stats_bp
app.register_blueprint(portfolio_stats_bp)

if __name__ == '__main__':
    app.run(host='[::1]', port=5001, debug=True)
