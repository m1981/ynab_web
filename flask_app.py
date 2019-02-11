import os
import tempfile

from flask import Flask
from flask import render_template

from modules import data_source as ds

app = Flask(__name__)

UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = set(['csv', 'zip'])
REPORT_FILENAME = 'report.csv'

@app.route('/')
def hello_world():
    content = ds.getData(os.path.join(UPLOAD_FOLDER, REPORT_FILENAME), -9, 6)
    return render_template('main.html', report_weeks=content, month_progress=ds.get_month_progress())


from flask import flash, request, redirect
from werkzeug.utils import secure_filename


app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
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
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <a href="/">Back to Report</a>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''



if __name__ == '__main__':
    app.run(debug=True)

