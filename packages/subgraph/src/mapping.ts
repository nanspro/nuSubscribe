import { BigInt, Bytes, log} from "@graphprotocol/graph-ts"
import {
  Contract,
  NewSubscriptionPage,
  NewCreatorPost,
  ApprovedSubscription,
  NewSubscriber
} from "../generated/Contract/Contract"
import { Creator, Subscriber, Membership } from "../generated/schema"
import { loadFromIpfs } from "./ipfs"
import { TransactionInfo, State } from "./transaction";

export function handleNewSubscriptionPage(event: NewSubscriptionPage): void {
  let entity = new Creator(event.transaction.from.toHex())
  entity.postsIpfsHash = []
  entity.members = []
  entity.address = event.params.creator.toHexString();
  entity.membershipFees = event.params.fees
  let metadata = event.params.metadata

  let ipfsHex = metadata.toHexString()
  let ipfsHashHex = '1220' + ipfsHex.slice(2)
  ipfsHashHex = '0x' + ipfsHashHex

  let ipfsHashBytes = Bytes.fromHexString(ipfsHashHex)
  let IpfsHash = ipfsHashBytes.toBase58()

  log.info("IPFS HASH: {}", [IpfsHash])

  let tx: TransactionInfo
  
  tx.blockNumber = event.block.number.toI32()
  tx.timestamp = event.block.timestamp.toI32()
  tx.from = event.transaction.from
  tx.hash = event.transaction.hash
  tx.state.ipfsReqs = 0
  
  let ipfsData = loadFromIpfs(IpfsHash, tx)
  // log.info("Ipfs Data", [ipfsData]);
  log.info("IPFS Pub key: {}", [ipfsData.get("name").toString()])
  entity.policyPubkey = ipfsData.get("name").toString()
  entity.label = ipfsData.get("label").toString()
  entity.aliceSigPubkey = ipfsData.get("alice_sig_pubkey").toString()

  entity.save()
}

export function handleNewCreatorPost(event: NewCreatorPost): void {
  let entity = Creator.load(event.transaction.from.toHex())
  if (entity != null){
    entity.postsIpfsHash.push(event.params.post); 
  }
}

export function handleApprovedSubscription(event: ApprovedSubscription): void {
  let entity1 = Creator.load(event.transaction.from.toHex())
  if (entity1 != null){
    let entity2 = Subscriber.load(event.params.buyer.toHex())
    if (entity2 != null){
      let id = entity2.subscribed
      log.info("Entities ID", id);

      for (let i = 0; i < id.length; i++){
        let membership = Membership.load(id[i])
        log.info("Membership", [membership.creator]);
        if (membership.creator == event.transaction.from.toHex()){
          membership.status = "APPROVED"
          membership.save()
        }
      }
      entity2.save()
      entity1.members.push(event.params.buyer.toHexString())
      entity1.save()
    }
  }
}

export function handleNewSubscriber(event: NewSubscriber): void {
  let entity = Subscriber.load(event.transaction.from.toHex())
  let entity2 = new Membership(event.transaction.from.toHex())
  entity2.creator = event.params.creator.toHexString()
  entity2.status = "NEW"
  entity2.save()
  if (entity == null) {
    entity = new Subscriber(event.transaction.from.toHex())
    entity.address = event.params.buyer.toHexString();
    entity.subscribed = [entity2.id]
  }
  else{
    entity.subscribed.push(entity2.id)
  }
  entity.save()
}
