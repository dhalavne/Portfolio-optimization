import numpy as np

def calculate_portfolio_stats(price_df, interval="1d"):
    daily_returns = price_df.pct_change().dropna()

    factor = 252 if interval == "1d" else 52 if interval == "1wk" else 12
    expected_returns = daily_returns.mean().values * factor
    cov_matrix = daily_returns.cov().values * factor
    correlation_matrix = daily_returns.corr().values
    volatilities = daily_returns.std().values * np.sqrt(factor)

    return {
        "tickers": price_df.columns.tolist(),
        "expected_returns": expected_returns.tolist(),
        "volatilities": volatilities.tolist(),
        "cov_matrix": cov_matrix.tolist(),
        "correlation_matrix": correlation_matrix.tolist()
    }