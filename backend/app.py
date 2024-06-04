from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'mysql'
app.config['MYSQL_DB'] = 'financedb'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/')
def index():
    # create a connection
    cur = mysql.connection.cursor()
    # execute a query
    cur.execute("INSERT INTO users (username, first_name, last_name, password, cash) VALUES ('John', 'Doe', 'Smith', 'defaultPassword', 1000)")
    # commit the transaction
    mysql.connection.commit()
    # close the cursor
    cur.close()

    return 'Data inserted.'  # return a success message

if __name__ == '__main__':
    app.run(debug=True)