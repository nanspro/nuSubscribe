import artist
import track_encrypt
import ipfshttpclient
from flask import Flask, request, Response, jsonify

app = Flask(__name__)
api = ipfshttpclient.connect('/dns/local-ipfs-node/tcp/5001/http')

LABEL_TO_POLICY = {}
ALICIA, ALICE_CONFIG_FILE = artist.initialize_alice()

@app.route('/policy_pubkey/<label>', methods = ["GET"])
def get_policy_pubkey(label):
    policy_info = artist.get_policy_pubkey(label)
    print(policy_info)
    hash = api.add(policy_info)
    return hash['Hash']

@app.route('/upload/<policy_pubkey>', methods = ["POST"])
def upload(policy_pubkey):
    f = request.files['file']
    file = track_encrypt.encrypt_image(policy_pubkey, f)
    hash = api.add(file)
    return hash['Hash']

@app.route('/grant/<label>/<bob_pubkeys>')
def grant_access(label, bob_pubkeys):
    artist.grant_access_policy(label, bob_pubkeys)
    return True

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=20000)
