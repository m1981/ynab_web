
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('main.html', report_weeks=[
        ['Category', 'May 2017', 'Jun 2017', 'Jul 2017'],
        ['Groceries', -1347, -1132, -1464],
        ['Misiu jedzenie', -165, -151, -291]
        ])
        # '36':
        #     {'Groceries':[1200,1500]},
        #     {'Dining Out':[350, 280]})



# from xhtml2pdf import pisa
# from cStringIO import StringIO
#
# def create_pdf(pdf_data):
#     pdf = StringIO()
#     pisa.CreatePDF(StringIO(pdf_data.encode('utf-8')), pdf)
#     return pdf

if __name__ == '__main__':
    app.run(debug=True)

