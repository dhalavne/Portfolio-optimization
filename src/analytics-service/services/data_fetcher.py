import yfinance as yf

def fetch_adjusted_closes(tickers, period="1y", interval="1d", adjust=False):
    data = yf.download(tickers, period=period, interval=interval, auto_adjust=False)['Adj Close']
    return data.dropna()