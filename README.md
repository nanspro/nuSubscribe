# nuSubscribe
An application where users can sponsor their favourite creators and subscribe to their content. Built on nucypher! 

## How it Works
- Creators and buyers will be running their nuCypher nodes, address of which will be entered upon login
- FE talks to creator's nucypher node and obtains policy info's ipfsHash which then gets submitted to our smart contract.
- Creator is now registered on our contract so after that he is now able to create posts. Every post gets encrypted locally on his node and gets pushed to ipfs. We post that hash to our smart contracts.
- Buyers don't go through any registration process cause we don't need any information from buyer other than that they want to support the creator, however with creator we decided to take some info like bio, name etc to reduce spam.
- Buyers pay creator's membership fees which goes to our smart contract and gets released to buyer only once they have been granted access. Currently we don't support any dispute resolution cause it felt out of the scope of hackathon to introduce oracles here but this could be a feature later on.
- Creators can see who all paid membership fees to the contract and then they can grant them access for a month.

### Using graph protocol for better UX
We created a subgraph for our smart contracts so that we can show relevant information to creators and buyers easily. The graph is deployed here https://thegraph.com/explorer/subgraph/nanspro/nusubscribe
- Using graph we show a creator all the buyers who paid membership fees and are waiting for access
- Buyer entity maintains state (pending access, approved) to see which of his subscriptions are approved or not
- Buyers can see all creators he is subscribed to
- Creators can see all their members and posts

## How to run locally


