from flask import Flask, session, redirect, url_for, escape, request

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def 

if __name__ == '__main__':
    app.run(debug=True)