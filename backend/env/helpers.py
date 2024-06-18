import yfinance as yf

def lookup(symbol):
    # Get the stock data
    stock = yf.Ticker(symbol)

    # Get the company name
    company_name = stock.info['shortName']

    # Get the current stock price
    current_price = stock.history(period="1d").tail(1)['Close'].iloc[0]

    return {
        "company_name": company_name,
        "current_price": current_price
    }

