import yfinance as yf


def lookup():
    # Get the data for the stock AAPL
    data = yf.Ticker("AAPL")
    
    return data.info['currentPrice']


def to_usd(my_price):
    return "${0:,.2f}".format(my_price)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

print(to_usd(lookup()))
