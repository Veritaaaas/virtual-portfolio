import yfinance as yf
import finnhub

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

def USD(value):
    return "${:,.2f}".format(value)

def get_trending_stocks():
    # Get the trending stocks
    finnhub_client = finnhub.Client(api_key="cpq4j0hr01qo647ncmj0cpq4j0hr01qo647ncmjg")
    trending = finnhub_client.stock_symbols('US')
    trending = trending[:10]
    
    symbols = []
    
    for i in range(len(trending)):
        symbol = trending[i]['symbol']
        symbols.append(symbol)
    
    return symbols
