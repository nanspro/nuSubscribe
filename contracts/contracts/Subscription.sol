pragma solidity >=0.4.21 <0.6.0;

contract Subscription {
    address public owner;

    struct Creator {
        bytes32 metadata;
        address account;
        uint membershipFee;
        bytes32[] posts;
        bytes32 policyInfo;
    }

    struct Buyer {
        address account;
        PolicyStatus subscription;
    }

    struct PolicyStatus {
        bytes32 policyInfo;
        uint status;
    }

    mapping(address => Creator) public creators;
    mapping(address => Buyer) buyers;
    mapping(bytes32 => PolicyStatus) public policies;

    event NewSubscriptionPage(address creator, bytes32 metadata, bytes32 policyInfo, uint fees);
    event NewCreatorPost(address creator, bytes32 post);
    event ApprovedSubscription(address creator, address buyer);
    event NewSubscriber(address buyer, address creator);

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    modifier onlyCreator() {
        Creator memory c = creators[msg.sender];
        if (c.account == msg.sender) _;
    }

    // Creator creates a policy on nuCypher, passes it ot then create a subscription page
    function createSubscriptionPage(uint fees, bytes32 metadata, bytes32 policyInfo) public {
        Creator memory c;
        c.account = msg.sender;
        c.metadata = metadata;
        c.policyInfo = policyInfo;
        c.membershipFee = fees;
        creators[msg.sender] = c;
        emit NewSubscriptionPage(msg.sender, metadata, policyInfo, fees);
    }

    function createPost(bytes32 data) onlyCreator public {
        creators[msg.sender].posts.push(data);
        emit NewCreatorPost(msg.sender, data);
    }

    function approveSubscription(address buyer) onlyCreator public {
        buyers[buyer].subscription.status = 0;
        policies[buyers[buyer].subscription.policyInfo].status = 0;
        // release from escrow
        msg.sender.transfer(creators[msg.sender].membershipFee);
        emit ApprovedSubscription(msg.sender, buyer);
    }

    function createSubscription(address creator) public payable {
        // escrow payment
        require(msg.value >= creators[creator].membershipFee, "Insufficient funds");
        PolicyStatus memory p;
        p.policyInfo = creators[creator].policyInfo;
        p.status = 1;
        Buyer memory b;
        b.account = msg.sender;
        b.subscription = p;
        buyers[msg.sender] = b;
        policies[creators[creator].policyInfo] = p;
        emit NewSubscriber(msg.sender, creator);
    }
}