import buyer
import buyer_keys
import ipfshttpclient
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import json 

app = Flask(__name__)
CORS(app)
api = ipfshttpclient.connect('/dns/localhost/tcp/5001/http')

LABEL_TO_POLICY = {}
PUBKEYS =buyer_keys.get_buyer_pubkeys()
PRIVKEYS = buyer_keys.get_buyer_privkeys()
BUYER = buyer.initialize_bob(PRIVKEYS)

@app.route('/get_pubkey')
def get_keys():
    with open('buyer.public.json') as f:
        stored_keys = json.load(f)
    return stored_keys

@app.route('/join/<policy_metadata>')
def join(policy_metadata):
    policy_metadata = json.loads(policy_metadata)
    label = buyer.join_policy(BUYER, policy_metadata)
    LABEL_TO_POLICY[label] = policy_metadata
    return label

@app.route('/decrypt/<label>/<ipfsHash>')
def decrypt_track(label, ipfsHash):
    print(label, ipfsHash)
    enc_data = api.cat(ipfsHash)

    print("Fetching encrypted track segment from ipfs", ipfsHash)
    data = buyer.reencrypt_segment(enc_data, LABEL_TO_POLICY[label], BUYER)
    if not data:
        print("Error decoding hash ", ipfsHash)

    return Response(data, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=20000)
