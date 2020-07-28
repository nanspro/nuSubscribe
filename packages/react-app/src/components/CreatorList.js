import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Link, Router } from "@reach/router";

export const Creator = (props) => (
  <div>
    <Link to={`/creators/${props.label}`}>{props.label}</Link>
    <h2>{props.bio}</h2>
  </div>
);

const ALL_CREATORS = gql`{
    creators(first: 10) {
        id 
        membershipFees 
        label
        bio
     }
    }`;

export default function CreatorList() {
  // Get all creators

  const { loading, error, data } = useQuery(ALL_CREATORS);

  React.useEffect(() => {
    if (!loading && !error && data && data.creators) {
      console.log({ creators: data.creators });
      //   setState(creators)
    }
  }, [loading, error, data]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error occured.</div>
      ) : (
        data.creators.map((d) => (
          <Creator key={d.id} label={d.label} bio={d.bio} />
        ))
      )}
    </>
  );
}
