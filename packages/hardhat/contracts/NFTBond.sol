pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./utils/SimpleInterest.sol";

abstract contract NFTBond is ERC721, SimpleInterest {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    struct Bond {
      uint256 mintingDate;
      uint256 maturity;
      uint256 principal;
      uint256 interest; //annual
    }


    mapping(uint256 => Bond) public bonds;
    IERC20 public principalToken;
    
    event BondCreated(uint256 id, uint256 mintingDate, uint256 maturity, uint256 principal, uint256 interest);
    event BondRedeemed(uint256 id, uint256 redeemDate, uint256 maturity, uint256 withdrawn, uint256 interest);


    constructor(address _principalTokenAddress, string memory _tokenName, string memory _tokenSymbol) ERC721(_tokenName, _tokenSymbol) {
      require(_principalTokenAddress != address(0), "NFTBond::Invalid token address");
      principalToken = IERC20(_principalTokenAddress);
      _setBaseURI("https://ipfs.io/ipfs/");
    }

    function _createBond(uint256 id, uint256 maturity, uint256 principal, uint256 interest) internal {
      require(interest > 0, "NFTBond::Interest cant be 0");
      require(principal > 0, "NFTBond::Principal cant be 0");
      bonds[id] = Bond(block.timestamp, maturity, principal, interest);
      emit BondCreated(id, block.timestamp, maturity, principal, interest);
    }


    function buyBond(string calldata tokenURI, uint256 maturity, uint256 principal, uint256 interest)
        external
        returns (uint256)
    {
        console.log("principal token", address(principalToken));
        console.log("sender", msg.sender);
        console.log("allowande",principalToken.allowance(msg.sender, address(this)));
        console.log("principal ", principal);
        require(principalToken.transferFrom(msg.sender, address(this), principal));
        _depositInPool(principal);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _createBond(newItemId, maturity, principal, interest);
        return newItemId;
    }

    function redeemBond(uint256 tokenId) external {
      require(canRedeem(tokenId), "NFTBond: Can't redeem yet");
      super._burn(tokenId);
      uint256 withdrawAmount = positionValue(tokenId);
      Bond memory bond = bonds[tokenId];
      delete bonds[tokenId];
      _withdrawFromPool(withdrawAmount);

      require(principalToken.transfer(msg.sender, withdrawAmount));
      emit BondRedeemed(tokenId, block.timestamp, bond.maturity, withdrawAmount, bond.interest);
    }

    function positionValue(uint256 tokenId) public view returns(uint256) {
      Bond memory bond = bonds[tokenId];
      if (block.timestamp >= bond.maturity.add(bond.mintingDate)) {
        return simpleInterest(bond.principal, bond.interest, bond.maturity);
      }
      return simpleInterest(bond.principal, bond.interest, block.timestamp.sub(bond.mintingDate));
    }

    function canRedeem(uint256 tokenId) public view returns(bool) {
      Bond memory bond = bonds[tokenId];
      return block.timestamp >= bond.maturity.add(bond.mintingDate);
    }

    function _depositInPool(uint256 amount) internal virtual;
    function _withdrawFromPool(uint256 amount) internal virtual;
    
}