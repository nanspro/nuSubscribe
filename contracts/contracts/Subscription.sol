pragma solidity >=0.4.21 <0.6.0;

contract Subscription {
    address public owner;

    struct Creator {
        address account;
        uint membershipFee;
        bytes32[] posts;
        bytes32 metadata;
        uint members;
    }

    struct Buyer {
        address account;
        PolicyStatus subscription;
    }

    struct PolicyStatus {
        bytes32 metadata;
        uint status;
    }

    mapping(address => Creator) public creators;
    mapping(address => Buyer) buyers;
    mapping(bytes32 => PolicyStatus) public policies;

    event NewSubscriptionPage(address creator, bytes32 metadata, uint fees);
    event NewCreatorPost(address creator, bytes32 post);
    event ApprovedSubscription(address creator, address buyer);
    event NewSubscriber(address buyer, address creator);

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    // Creator creates a policy on nuCypher, passes it to then create a subscription page
    function createSubscriptionPage(uint fees, bytes32 metadata) public {
        Creator memory c;
        c.account = msg.sender;
        c.metadata = metadata;
        c.membershipFee = fees;
        c.members = 0;
        creators[msg.sender] = c;
        emit NewSubscriptionPage(msg.sender, metadata, fees);
    }

    function createPost(bytes32 data) public {
        creators[msg.sender].posts.push(data);
        emit NewCreatorPost(msg.sender, data);
    }

    function approveSubscription(address buyer) public {
        require(creators[msg.sender].account == msg.sender);
        buyers[buyer].subscription.status = 0;
        policies[buyers[buyer].subscription.metadata].status = 0;
        // release from escrow
        msg.sender.transfer(creators[msg.sender].membershipFee);
        emit ApprovedSubscription(msg.sender, buyer);
    }

    function createSubscription(address creator) public payable {
        // escrow payment
        require(msg.value >= creators[creator].membershipFee, "Insufficient funds");
        PolicyStatus memory p;
        p.metadata = creators[creator].metadata;
        p.status = 1;
        Buyer memory b;
        b.account = msg.sender;
        b.subscription = p;
        buyers[msg.sender] = b;
        policies[creators[creator].metadata] = p;
        emit NewSubscriber(msg.sender, creator);
    }
}