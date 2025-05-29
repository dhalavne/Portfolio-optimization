from flask import Blueprint, request, jsonify
from services.data_fetcher import fetch_adjusted_closes
from services.stats_calculator import calculate_portfolio_stats

portfolio_stats_bp = Blueprint('portfolio_stats', __name__)

@portfolio_stats_bp.route('/portfolio-stats', methods=['POST'])
def get_portfolio_stats():
    try:
        data = request.get_json()
        tickers = data['tickers']
        period = data.get('period', '1y')
        interval = data.get('interval', '1d')

        prices = fetch_adjusted_closes(tickers, period, interval)
        stats = calculate_portfolio_stats(prices, interval)

        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
