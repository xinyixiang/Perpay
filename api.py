from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from final import get_total

UPLOAD_FOLDER = '/file'
ALLOWED_EXTENSIONS = set(['jpg','png'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# paths = get_all_path('receipt')
# for pa in paths:
#     print(get_total(pa))
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)
        f.save(filename)
        return jsonify({
            "total": get_total(filename)
        })


app.run(host='0.0.0.0')
