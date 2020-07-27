import buyer
import buyer_keys
import ipfshttpclient
from flask import Flask, request, Response, jsonify

app = Flask(__name__)
api = ipfshttpclient.connect('/dns/local-ipfs-node/tcp/5001/http')

LABEL_TO_POLICY = {}
PUBKEYS =buyer_keys.get_buyer_pubkeys()
PRIVKEYS = buyer_keys.get_buyer_privkeys()
BUYER = buyer.initialize_bob(PRIVKEYS)

@app.route('/join', methods = ["POST"])
def join():
    policy_metadata = request.get_json()
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

    return Response(data, mimetype='application/octet-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=20000)
