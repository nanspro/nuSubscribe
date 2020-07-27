import json
import os
from umbral.keys import UmbralPrivateKey, UmbralPublicKey

BUYER_PUBLIC_JSON = 'buyer.public.json'
BUYER_PRIVATE_JSON = 'buyer.private.json'


def generate_buyer_keys():
    enc_privkey = UmbralPrivateKey.gen_key()
    sig_privkey = UmbralPrivateKey.gen_key()

    buyer_privkeys = {
        'enc': enc_privkey.to_bytes().hex(),
        'sig': sig_privkey.to_bytes().hex(),
    }

    with open(BUYER_PRIVATE_JSON, 'w') as f:
        json.dump(buyer_privkeys, f)

    enc_pubkey = enc_privkey.get_pubkey()
    sig_pubkey = sig_privkey.get_pubkey()
    buyer_pubkeys = {
        'enc': enc_pubkey.to_bytes().hex(),
        'sig': sig_pubkey.to_bytes().hex()
    }
    with open(BUYER_PUBLIC_JSON, 'w') as f:
        json.dump(buyer_pubkeys, f)


def _get_keys(file, key_class):
    if not os.path.isfile(file):
        generate_buyer_keys()

    with open(file) as f:
        stored_keys = json.load(f)
    keys = dict()
    for key_type, key_str in stored_keys.items():
        keys[key_type] = key_class.from_bytes(bytes.fromhex(key_str))
    return keys


def get_buyer_pubkeys():
    return _get_keys(BUYER_PUBLIC_JSON, UmbralPublicKey)


def get_buyer_privkeys():
    return _get_keys(BUYER_PRIVATE_JSON, UmbralPrivateKey)
