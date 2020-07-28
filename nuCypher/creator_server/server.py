import artist
import track_encrypt
import ipfshttpclient
import os
import json

from umbral.keys import UmbralPrivateKey, UmbralPublicKey
from flask import Flask, request, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './uploads'
CORS(app)
api = ipfshttpclient.connect('/dns/localhost/tcp/5001/http')

LABEL_TO_POLICY = {}
ALICIA, ALICE_CONFIG_FILE = artist.initialize_alice()

@app.route('/policy_pubkey/<label>')
def get_policy_pubkey(label):
    policy_info = artist.get_policy_pubkey(label)
    # print(policy_info)
    # hash = api.add(policy_info)
    return policy_info

@app.route('/upload/<label>', methods = ["POST"])
def upload(label):
    f = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], f.filename)
    f.save(file_path)
    
    label = label.encode()
    policy_pubkey = ALICIA.get_policy_encrypting_key_from_label(label)
    
    uploadFile = track_encrypt.encrypt_image(policy_pubkey, file_path)
    ipfsHash = api.add(uploadFile)
    print(ipfsHash)
    return ipfsHash['Hash']

@app.route('/grant/<label>/<bob_pubkeys>')
def grant_access(label, bob_pubkeys):
    bob_pub_keys = json.loads(bob_pubkeys)
    bobpubkeys = {}
    bobpubkeys["enc"] = UmbralPublicKey.from_bytes(bytes.fromhex(bob_pub_keys["enc"]))
    bobpubkeys["sig"] = UmbralPublicKey.from_bytes(bytes.fromhex(bob_pub_keys["sig"]))
    artist.grant_access_policy(label, bobpubkeys)
    return

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=19000)
