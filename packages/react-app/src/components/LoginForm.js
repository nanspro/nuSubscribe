import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IPFS from "nano-ipfs-store";

import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { addresses, abis } from "@project/contracts";
import bs58 from "bs58";

const ipfs = IPFS.at("https://ipfs.infura.io:5001");
const provider = new Web3Provider(window.ethereum);
const signer = provider.getSigner();

const getBytes32FromIpfsHash = (ipfsListing) => {
  return "0x" + bs58.decode(ipfsListing).slice(2).toString("hex");
};

export default function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState();
  
  const onSubmit = async (formData) => {

    await window.ethereum.enable();
    const address = await signer.getAddress();
    console.log(address);
    setAddress(address);

    props.setUserHandle(formData.handle);
    props.setUserType(formData.type);
    props.setNodeUrl(formData.nodeUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="handle">handle</label>
        <input
          name="handle"
          type="text"
          ref={register({ required: true, maxLength: 20 })}
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

      <div>
        <label htmlFor="type">Type</label>
        <select name="type" ref={register}>
          <option value="creator">Creator</option>
          <option value="buyer">Subscriber</option>
        </select>
      </div>

      <div>
        <label>Address = {address}</label>
      </div>
      <input type="submit" />
    </form>
  );
}
