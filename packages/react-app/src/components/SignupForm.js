import React from "react";
import { useForm } from "react-hook-form";
import IPFS from "nano-ipfs-store";

import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";

import { addresses, abis } from "@project/contracts";
import bs58 from "bs58";

const ipfs = IPFS.at("http://localhost:5001");
const provider = new Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractObj = new Contract(addresses.contract, abis.contract, provider);


const getBytes32FromIpfsHash = (ipfsListing) => {
  return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex');
};

export default function SignupForm() {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = async formData => {
        const { name, handle, bio, nodeUrl } = formData;
        console.log(name, handle, bio, nodeUrl);
        // Call Init Alice on nodeURL and get policyMetadata
        // const response = await fetch(`${nodeUrl}/initAliceAndGetKey/${handle}`)
        // const policyMetadata = await response.json();
        // Create IPFS Document, Upload and get hash
        const ipfsDocument = {name, bio};
        const ipfsHash = ipfs.add(ipfsDocument);
        const ipfsBytes32 = getBytes32FromIpfsHash(ipfsHash);
    
        // Call the createSubscriptionPage function in the contract
        const signedContract = contractObj.connect(signer);
        // const eth = ethers.utils.parseEther("10")

        await signedContract.createSubscriptionPage("10", ipfsBytes32);
        
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
          <input
            name="bio"
            type="textbox"
            ref={register({  maxLength: 420 })}
          />
        </div>
        <div>
          <label htmlFor="nodeUrl">Node URL</label>
          <input
            name="nodeUrl"
            type="url"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <input type="submit" />
      </form>
    );
}