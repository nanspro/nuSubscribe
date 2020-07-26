pragma solidity >=0.4.21 <0.6.0;

contract Subscription {
    address public owner;

    struct Creator {
        address account;
        uint membershipFee;
        bytes32[] posts;
        uint subscribers;
    }

    struct Buyer {
        address account;
        address memberOf;
    }

    mapping(address => Creator) public creators;
    mapping(address => Buyer) public buyers;

    event NewSubscriptionPage(address creator);
    event NewSubscriber(address buyer, address creator);
    event NewCreatorPost(address creator, bytes32 post);

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function createSubscription(uint fees) public {
        Creator memory c;
        c.account = msg.sender;
        c.membershipFee = fees;
        creators[msg.sender] = c;
        emit NewSubscriptionPage(msg.sender);
    }

    function createPost(bytes32 data) public {
        creators[msg.sender].posts.push(data);
        emit NewCreatorPost(msg.sender, data);
    }

    function buySubscription(address creator) public payable {
        require((creators[creator].membershipFee - msg.value <= 0) && (creators[creator].membershipFee > 0));
        creators[creator].subscribers = creators[creator].subscribers + 1;
        Buyer memory b;
        b.account = msg.sender;
        b.memberOf = creator;
        buyers[msg.sender] = b;
        emit NewSubscriber(msg.sender, creator);
    }
}