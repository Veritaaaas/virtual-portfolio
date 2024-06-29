from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector as my
import logging
import bcrypt
from datetime import datetime

from helpers import lookup, USD, query

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'JGm8AG0QH6'  # Change this!
jwt = JWTManager(app)

cnx = my.connect(
    host="localhost",
    user="root",
    password="mysql",
    database="financedb"
)

@app.route('/login', methods=['POST'])
def login():
    # Ensure request is JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    
    # Ensure all fields were submitted
    if not all(key in data for key in ["username", "password"]):
        return jsonify({"error": "Missing fields in request"}), 400

    # Create a cursor
    cursor = cnx.cursor()

    # Query database for username
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (data["username"],))
    rows = cursor.fetchall()

    if len(rows) != 1:
        return jsonify({"error": "Invalid username or password"}), 400

    user = rows[0]

    # Check if password is correct
    password = data["password"].encode('utf-8')
    hashed_password = user[3].encode('utf-8')
    
    if bcrypt.checkpw(password, hashed_password):
        access_token = create_access_token(identity=user[0])
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 400
    

@app.route('/register', methods=['POST'])
def register():
    # Ensure request is JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    
    # Ensure all fields were submitted
    if not all(key in data for key in ["name", "username", "password"]):
        return jsonify({"error": "Missing fields in request"}), 400

    # Create a cursor
    cursor = cnx.cursor()

    # Query database for username
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (data["username"],))
    rows = cursor.fetchall()

    if len(rows) == 1:
        return jsonify({"error": "username already exists"}), 400

   # Insert new user into database
    password = data["password"].encode('utf-8')  # convert password to bytes
    hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
    
    logging.info("Hashed password: %s", hashed_password)
    
    query = "INSERT INTO users (name, username, password) VALUES(%s, %s, %s)"
    cursor.execute(query, (data["name"], data["username"], hashed_password.decode('utf-8')))  # convert hashed password back to string
    # Commit the transaction
    cnx.commit()

    return jsonify({"message": "Registration successful"}), 200

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    if request.method == 'GET':
        # Get the username from the JWT
        current_user = get_jwt_identity()

        # Create a cursor
        cursor = cnx.cursor()

        # Query database for user's stocks
        query = "SELECT * FROM portfolio WHERE portfolio.user_id = %s"
        cursor.execute(query, (current_user,))
        rows = cursor.fetchall()

        stocks = []
        cash = 0

        for row in rows:
            stock = lookup(row[1])
            stock['symbol'] = row[1]
            stock["shares"] = row[2]
            stock['total'] = row[2] * stock['current_price']
            stock['current_price'] = USD(stock['current_price'])
            stock['total'] = USD(stock['total'])
            stocks.append(stock)
            
        query = "SELECT cash FROM users WHERE user_id = %s"
        cursor.execute(query, (current_user,))
        cash = USD(cursor.fetchall()[0][0])

        return jsonify(stocks=stocks,cash=cash ), 200
    
@app.route('/deposit', methods=['POST'])
@jwt_required()
def deposit():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    
    data['deposit'] = float(data['deposit'])

    if not all(key in data for key in ['deposit']):
        return jsonify({"error": "Missing fields in request"}), 400

    current_user = get_jwt_identity()

    cursor = cnx.cursor()

    query = "SELECT cash FROM users WHERE user_id = %s"
    cursor.execute(query, (current_user,))
    cash = cursor.fetchall()[0][0]
    
    new_cash = cash + data['deposit']

    query = "UPDATE users SET cash = %s WHERE user_id = %s"
    cursor.execute(query, (new_cash, current_user))
    cnx.commit()

    return jsonify({'cash': new_cash}), 200

@app.route('/withdraw', methods=['POST'])  
@jwt_required()
def withdraw():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    
    data['withdraw'] = float(data['withdraw'])

    if not all(key in data for key in ['withdraw']):
        return jsonify({"error": "Missing fields in request"}), 400

    current_user = get_jwt_identity()

    cursor = cnx.cursor()

    query = "SELECT cash FROM users WHERE user_id = %s"
    cursor.execute(query, (current_user,))
    cash = cursor.fetchall()[0][0]
    
    if (cash < data['withdraw']):
        return jsonify({"error": "Insufficient funds"}), 400
    
    new_cash = cash - data['withdraw']

    query = "UPDATE users SET cash = %s WHERE user_id = %s"
    cursor.execute(query, (new_cash, current_user))
    cnx.commit()

    return jsonify({'cash': new_cash}), 200


@app.route('/look', methods=['POST'])
@jwt_required()
def look():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    if not all(key in data for key in ["symbol"]):
        return jsonify({"error": "Missing fields in request"}), 400

    stock = query(data["symbol"])
    
    stock["price"] = USD(stock["price"])
    stock["revenue_growth"] = "{:.2%}".format(stock["revenue_growth"])
    stock["net_income"] = USD(stock["net_income"])
    
    return jsonify(stock), 200

@app.route('/buy', methods=['POST'])
@jwt_required()
def buy():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    if not all(key in data for key in ["symbol", "quantity"]):
        return jsonify({"error": "Missing fields in request"}), 400

    current_user = get_jwt_identity()

    cursor = cnx.cursor()

    query = "SELECT cash FROM users WHERE user_id = %s"
    cursor.execute(query, (current_user,))
    cash = cursor.fetchall()[0][0]
    
    stock = lookup(data["symbol"])
    total = stock["current_price"] * int(data["quantity"])
    
    if total > cash:
        return jsonify({"error": "Insufficient funds"}), 400

    query = "SELECT * FROM portfolio WHERE user_id = %s AND symbol = %s"
    cursor.execute(query, (current_user, data["symbol"]))
    rows = cursor.fetchall()
    
    if len(rows) == 1:
        query = "UPDATE portfolio SET shares = shares + %s WHERE user_id = %s AND symbol = %s"
        cursor.execute(query, (data["quantity"], current_user, data["symbol"]))
        cnx.commit()
    else:
        query = "INSERT INTO portfolio (user_id, symbol, shares) VALUES(%s, %s, %s)"
        cursor.execute(query, (current_user, data["symbol"], data["quantity"]))
        cnx.commit()
    
    query = "INSERT INTO history (user_id, date, symbol, shares, price, total, type) VALUES(%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (current_user, datetime.now(), data["symbol"], data["quantity"], stock["current_price"], total, "BUY"))
    cnx.commit()

    new_cash = cash - total

    query = "UPDATE users SET cash = %s WHERE user_id = %s"
    cursor.execute(query, (new_cash, current_user))
    cnx.commit()

    return jsonify({"cash": new_cash}), 200
    
@app.route('/trade', methods=['GET'])
@jwt_required()
def trade():
    suggestions = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JNJ', 'V']
    
    for i in range(len(suggestions)):
        suggestions[i] = query(suggestions[i])
        print(suggestions[i])
        suggestions[i]["price"] = USD(suggestions[i]["price"])
        suggestions[i]["revenue_growth"] = "{:.2%}".format(suggestions[i]["revenue_growth"])
        suggestions[i]["net_income"] = USD(suggestions[i]["net_income"])
        
    return jsonify(suggestions), 200
    

if __name__ == '__main__':
    app.run(debug=True)