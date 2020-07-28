import React, { useState } from "react";
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
  return "0x" + bs58.decode(ipfsListing).slice(2).toString("hex");
};

export default function UploadBox(props) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.uploadFile[0]);

    const response = await fetch(`${props.nodeUrl}/upload/${props.handle}`, {
      method: "POST",
      body: formData,
    });
    
    const ipfsHash = await response.text();
    console.log(ipfsHash);

    const ipfsBytes32 = getBytes32FromIpfsHash(ipfsHash);
    console.log(ipfsBytes32);

    // Call the createPost function in the contract
    const signedContract = contractObj.connect(signer);
    // const eth = ethers.utils.parseEther("10")
    console.log("CallingContract")
    await signedContract.createPost(ipfsBytes32);        
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input ref={register} type="file" name="uploadFile" />
        <label>Upload Photo, it will not leave your node unencrypted! </label>
      </div>
      <button>Submit</button>
    </form>
  );
}
