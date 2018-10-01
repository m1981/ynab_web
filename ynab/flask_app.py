
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template
from flask import url_for
import os

from backports import csv
def getData():
    print(__file__)
    THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(THIS_FOLDER, 'tests/ynab-reports.csv')
    with open(data_file, 'r', encoding='utf-8') as f:
        print(f.readline())


app = Flask(__name__)

@app.route('/')
def hello_world():
    getData()
    return render_template('main.html', report_weeks='sdsd')
        # '36':
        #     {'Groceries':[1200,1500]},
        #     {'Dining Out':[350, 280]})

if __name__ == '__main__':
    app.run(debug=True)

