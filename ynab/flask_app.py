
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('main.html', report_weeks='sdsd')
        # '36':
        #     {'Groceries':[1200,1500]},
        #     {'Dining Out':[350, 280]})

if __name__ == '__main__':
    app.run(debug=True)

