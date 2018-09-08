
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('main.html', report_weeks={'36': ['Groceries 🍞🧀',20], '37': ['Dining Out', 35]})
    #return 'Hello from Flask 2!'

if __name__ == '__main__':
    app.run(debug=True)
