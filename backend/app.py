from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mysql'
app.config['MYSQL_DB'] = 'financedb'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/', methods=['POST'])
@cross_origin()
def index():
    # get form data
    data = request.get_json()
    
    # create a connection
    cur = mysql.connection.cursor()
    
    # checks if the user exists
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (data['username'], data['password']))
    
    # fetch the result
    user = cur.fetchone()
    
    # close the cursor
    cur.close()
    
    if user:
        return jsonify({'message': 'User found.'})
    else:
        return jsonify({'message': 'User not found.'})


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    # get form data
    data = request.get_json()

    # create a connection
    cur = mysql.connection.cursor()

    # execute a query
    cur.execute("INSERT INTO users (username, first_name, last_name, password, cash) VALUES (%s, %s, %s, %s, 1000)", (data['username'], data['firstName'], data['lastName'], data['password']))

    # commit the transaction
    mysql.connection.commit()

    # close the cursor
    cur.close()

    return jsonify({'message': 'Data inserted.'})  # return a success message

if __name__ == '__main__':
    app.run(debug=True)