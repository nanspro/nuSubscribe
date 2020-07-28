import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";

import { addresses, abis } from "@project/contracts";

const creatorNode = "http://localhost:19000";
const GET_CREATOR_PAGE = gql`
  {
    creators(label: $label) {
      id
      membershipFees
      policyPubkey
      aliceSigPubkey
      label
      members
      address
      postsIpfsHash
    }
  }
`;

const provider = new Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractObj = new Contract(addresses.contract, abis.contract, provider);

export default function CreatorPage(props) {
  const { loading, error, data } = useQuery(GET_CREATOR_PAGE, {
    variables: { label: props.creatorHandle },
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!loading && !error && data && data.creators) {
      console.log({ creators: data.creators });
      setPosts([data.creators[0].postsIpfsHash]);
    }
  }, [loading, error, data]);

  const onSub = async () => {
    await window.ethereum.enable();
    const signedContract = contractObj.connect(signer);
    console.log("CallingContract");
    // await signedContract.createSubscription(data.creators[0].id, { value: 12 });

    const BuyerAddress = await signer.getAddress();
    const response = await fetch(`${props.nodeUrl}/get_pubkey`);
    const buyerPubKey = await response.json();

    const { policyPubkey, aliceSigPubkey, label } = data.creators[0];
    const metadata = { policy_pubkey: policyPubkey, alice_sig_pubkey: aliceSigPubkey, label }
    await fetch(`${props.nodeUrl}/join/${JSON.stringify(metadata)}`);
    // console.log(buyerPubKey);
    await fetch(
      `${creatorNode}/grant/${data.creators[0].label}/${JSON.stringify(buyerPubKey)}`
    );


  };

  const SubButton = () => <button onClick={onSub}>createSubscription</button>;
  const PostedImages = () =>
    posts.map((ipfsHash) => (
      <img
        key={ipfsHash}
        src={`${props.nodeUrl}/decrypt/${props.creatorHandle}/${ipfsHash}`}
        alt="Please subscribe to view images"
        className="img-responsive"
      />
    ));

  const loadingOrError = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error occured.</div>;
    }
    return <> <SubButton /> <br ></br> <PostedImages /> </>;
  };

  return loadingOrError();
}
