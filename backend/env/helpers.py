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
    
def query(symbol):
    # Get the stock data
    stock = yf.Ticker(symbol)

    # Get the company name
    company_name = stock.info.get('shortName', 'N/A')
    
    # Get the company symbol
    company_symbol = stock.info.get('symbol', 'N/A')

    # Get the EPS ratio
    eps_ratio = stock.info.get('trailingEps', 'N/A')

    # Get the PE Ratio
    pe_ratio = stock.info.get('trailingPE', 'N/A')

    # Get the Revenue Growth
    revenue_growth = stock.info.get('revenueGrowth', 'N/A')

    # Get the Net Income
    net_income = stock.info.get('netIncomeToCommon', 'N/A')
    
    # Fetch the stock history for the last day
    history = stock.history(period="1d")

    # Check if the history DataFrame is not empty
    if not history.empty:
        current_price = history['Close'].iloc[-1]  # Safely access the last 'Close' value
    else:
        # Handle the case where no data is available
        # For example, set current_price to None or log a warning
        current_price = None
        print("Warning: No data available for the stock's last closing price.")
        

    return {
        "name": company_name,
        "symbol": company_symbol,
        "eps": eps_ratio,
        "pe_ratio": pe_ratio,
        "revenue_growth": revenue_growth,
        "net_income": net_income,
        "price": current_price
    }
    

def USD(value):
    return "${:,.2f}".format(value)

