import React from "react";
import { useForm } from "react-hook-form";
import IPFS from "nano-ipfs-store";

import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

import { addresses, abis } from "@project/contracts";
import bs58 from "bs58";

const ipfs = IPFS.at("https://ipfs.infura.io:5001");
const provider = new Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractObj = new Contract(addresses.contract, abis.contract, provider);

const getBytes32FromIpfsHash = (ipfsListing) => {
  return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex');
};

export default function SignupForm() {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = async formData => {
        await window.ethereum.enable();

        const { name, handle, bio, nodeUrl, subscriptionFee } = formData;
        console.log(name, handle, bio, nodeUrl, subscriptionFee);
        // Call Init Alice on nodeURL and get policyMetadata
        const response = await fetch(`${nodeUrl}/policy_pubkey/${handle}`);
        const policyMetadata = await response.json();
        // Create IPFS Document, Upload and get hash
        const ipfsDocument = {
          name,
          bio,
          policyPubkey: policyMetadata.policy_pubkey,
          aliceSigPubkey: policyMetadata.alice_sig_pubkey,
          label: policyMetadata.label
        };
        console.log(ipfsDocument)
        
        const ipfsHash = await ipfs.add(JSON.stringify(ipfsDocument));
        console.log(ipfsHash)

        const ipfsBytes32 = getBytes32FromIpfsHash(ipfsHash);
        console.log(ipfsBytes32)
    
        // Call the createSubscriptionPage function in the contract
        const signedContract = contractObj.connect(signer);
        
        console.log("CallingContract")
        await signedContract.createSubscriptionPage(subscriptionFee, ipfsBytes32);
        
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="handle">Handle</label>
          <input
            name="handle"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input name="bio" type="textbox" ref={register({ maxLength: 420 })} />
        </div>
        <div>
          <label htmlFor="subscriptionFee">Subscription Fee (in wei/month)</label>
          <input
            name="subscriptionFee"
            type="integer"
            ref={register({ required: true })}
          />
        </div>
        <div>
          <label htmlFor="nodeUrl">Node URL</label>
          <input
            name="nodeUrl"
            type="url"
            ref={register({ required: true })}
          />
        </div>
        <input type="submit" />
      </form>
    );
}