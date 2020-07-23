import os
import tempfile

from flask import Flask
from flask import render_template

from modules import data_source as ds

app = Flask(__name__)

UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = set(['csv', 'tsv', 'zip'])
REPORT_FILENAME = 'report.csv'

@app.route('/')
def hello_world():
    content = ds.getData(os.path.join(UPLOAD_FOLDER, REPORT_FILENAME), -15, 12)
    return render_template('main.html', report_weeks=content, month_progress=ds.get_month_progress())


from flask import flash, request, redirect
from werkzeug.utils import secure_filename


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = "sdqdc23f2342d223g"
app.config["EXPLAIN_TEMPLATE_LOADING"] = True

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], REPORT_FILENAME))
            return redirect('/')
        else:
            flash("Supported formats: {}".format(ALLOWED_EXTENSIONS))
            return redirect(request.url)

    return render_template("upload.html")


if __name__ == '__main__':
    app.run(debug=True)

