
# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('main.html', report_weeks=[
['Category', 'May 2017', 'Jun 2017', 'Jul 2017', 'Aug 2017', 'Sep 2017', 'Nov 2017'],
['Groceries', 0, 35, 1347, 1132, 1464, 1995],
['Misiu jedzenie', 0, 0, 165, 151, 291, 427],
['Pysia jedzenie', 0, 0, 0, 0, 281, 117],
['Dining Out', 0, 6, 473, 643, 401, 574],
['Bus & Taxi', 0, 87, 72, 228, 148, 97],
['Car & Bike', 0, 0, 0, 0, 0, 0],
['Cosmetics', 0, 30, 419, 287, 228, 617],
['Grooming', 0, 0, 49, 70, 0, 180],
['Clothing', 0, 69, 407, 1138, 35, 74],
['Rent/Mortgage', 0, 2530, 2544, 2000, 2349, 2371],
['Ps Justa', 0, 200, 200, 300, 200, 100],
['Ps ja', 0, 0, 220, 320, 200, 300],
['Drugs', 0, 0, 341, 56, 275, 63],
['Witek', 0, 0, 130, 130, 130, 0],
['Entertainment', 0, 0, 41, 0, 46, 81],
['Home', 0, 211, 58, 3, 47, 0],
['Books, Music, Software', 0, 0, 0, 0, 132, 86],
['Guests', 0, 477, 605, 0, 0, 941],
['Gifts', 0, 0, 28, 49, 33, 509],
['Sport', 0, 0, 0, 0, 0, 89],
['Electronics', 0, 0, 0, 0, 0, 0],
['Charity', 0, 0, 0, 0, 0, 0],
['Justa prezent', 0, 0, 0, 0, 0, 0],
['Justa Medical', 0, 0, 0, 0, 0, 0],
['Justa Development', 0, 0, 0, 0, 2212, 0],
['Business training', 0, 0, 1000, 1000, 1200, 1200],
['Misiu Medical', 0, 0, 0, 410, 290, 150],
['Staff forgot to budget', 0, 0, 0, 0, 0, 0],
['Loans', 0, 0, 650, 0, 500, 250],
['Compulsive!!!', 0, 0, 1782, 684, 1081, 237],
['Bank fees', 0, 17, 0, 34, 0, 0],
['Play  komorka', 0, 25, 138, 126, 107, 131],
['Internet', 0, 44, 44, 44, 44, 44],
['Netflix', 0, 0, 0, 0, 13, 13],
['Allegro sprzedaz', 0, 0, 28, 10, 82, 0],
['Azuon', 0, 0, 0, 39, 0, 0],
['Garaz', 0, 50, 50, 50, 100, 50],
['Trav. Transport', 0, 0, 0, 0, 0, 0],
['Trav. Rent', 0, 0, 0, 0, 0, 0],
['Trav. Groceries', 0, 0, 0, 0, 0, 0],
['Trav. Attractions', 0, 34, 0, 486, 0, 0],
['Trav. Dining out', 0, 0, 0, 0, 0, 0],
['Hidden Categories', 0, 475, 567, 475, 2667, 1355],
['Total Expenses', 0, 4295, 12006, 10003, 15363, 12603],
['Net Income', 0, 1083, 2905, 933, 13083, 3815],
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

