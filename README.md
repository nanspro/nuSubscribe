# nuSponsor
An application where users can sponsor their favourite creators and subscribe to their content. Built on nucypher!

## Creator
- Creator will be running a nuCypher node address of which will be entered on login

- Creator signs up, enters profile metadata (handle, bio, membership fees, pubkey)
    - Frontend -> Call createSubscriptionPage in Contract

- Creator creates/uploads new post
    - Frontend -> Creator's node, will encrypt the data 
    - Creator Node -> return ipfsHash to -> Frontend 
    - Frontend -> Call createPost in the contract

- Creator selects who to Approve as subscribers (by granting access to policy)
- Creator grants 

## Buyer
- Buyer will be running a nuCypher node address of which will be entered on login

- Buyer can explore all the creator pages and metadata
- Buyer subscribes to a creator 
    - Frontend -> Call createSubscription in contract + membership fees
    - Frontend -> Contract, pays membership fees
    - Membership Fees are kept in escrow till creator approves new subscriber
- Buyer status
- Buyer joins policy

- Buyer visits subscription page 
    - Frontend -> Buyer Node will get data from IPFS 
    - Buyer Node will decrypt -> frontend

