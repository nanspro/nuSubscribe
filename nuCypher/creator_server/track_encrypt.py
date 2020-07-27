import os
import json
import msgpack

from nucypher.characters.lawful import Enrico

def encrypt_image(policy_pubkey, file_path):
    data_source = Enrico(policy_encrypting_key=policy_pubkey)
    data_source_public_key = bytes(data_source.stamp)
    print(file_path)

    with open(file_path, "rb") as f:
        plaintext = f.read()

    ciphertext, signature = data_source.encrypt_message(plaintext)
    
    print("Signature", signature)
    data = {
        'image_data': ciphertext.to_bytes(),
        'data_source': data_source_public_key
    }
    
    with open(file_path + '_encrypted', "wb") as f:
        msgpack.dump(data, f, use_bin_type=True)
    
    return file_path + '_encrypted'
