// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Scratch is ERC721URIStorage {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter public tokenCount;
    address payable public immutable feeAccount;
    uint public immutable feePercent;

    struct Item {
        uint tokenId;
        uint price;
        address payable seller;
        address buyer;
        bool sold;
    }

    mapping(uint => Item) public items;

    event Offered(uint tokenId, uint price, address indexed seller);
    event Bought(uint tokenId, uint price, address indexed seller, address indexed buyer);

    constructor(uint _feePercent) ERC721("SCRATCH", "SRT") {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(string memory tokenURI, uint price) external {
        require(price > 0, "Price Must be Greater than Zero");
        tokenCount.increment();
        uint256 currentID = tokenCount.current();
        _safeMint(msg.sender, currentID);
        _setTokenURI(currentID, tokenURI);
        _transfer(msg.sender, address(this), currentID);
        items[currentID] = Item(currentID, price, payable(msg.sender), address(0), false);
        emit Offered(currentID, price, msg.sender);
    }

    function purchaseItem(uint id) public payable {
        uint _totalPrice = getTotalPrice(id);
        Item storage item = items[id];
        require(id > 0 && id <= tokenCount.current(), "Invalid Nft");
        require(msg.value >= _totalPrice, "Not Enough Ether for Transaction");
        require(!item.sold, "Nft was already Purchased");
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true;
        item.buyer = msg.sender;
        ERC721(address(this)).transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(item.tokenId, item.price, item.seller, msg.sender);
    }

    function getTotalPrice(uint id) public view returns (uint) {
        return ((items[id].price * (100 + feePercent)) / 100);
    }

    function getTotalNfts() public view returns (uint) {
        return (tokenCount.current());
    }

    function getItems(uint256 id) external view returns (Item memory) {
        return items[id];
    }
}
