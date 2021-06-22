pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract NFTBond is ERC721 {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    struct Bond {
      uint256 mintingDate;
      uint256 maturity;
      uint256 principal;
      uint256 interest; //in seconds
    }

    mapping(uint256 => Bond) public bonds;
    IERC20 principalToken;

    constructor(address principalTokenAddress) public ERC721("EthicBond", "EHB") {
      require(principalTokenAddress != address(0), "NFTBond::Invalid token address");
      principalToken = IERC20(principalTokenAddress);
      _setBaseURI("https://ipfs.io/ipfs/");
    }

    function _createBond(uint256 id, uint256 maturity, uint256 principal, uint256 interest) internal {
      require(interest > 0, "NFTBond::Interest cant be 0");
      require(principal > 0, "NFTBond::Principal cant be 0");
      require(principalToken.transferFrom(msg.sender, address(this), principal));
      bonds[id] = Bond(block.timestamp, maturity, principal, interest);
    }


    function buyBond(string calldata tokenURI,address buyer, uint256 maturity, uint256 principal, uint256 interest)
        external
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(buyer, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _createBond(newItemId, maturity, principal, interest);
        return newItemId;
    }
    function redeemBond(uint256 tokenId) external {
      require(canRedeem(tokenId), "NFTBond: Can't redeem yet");
      super._burn(tokenId);
      uint256 withdrawAmount = positionValue(tokenId);
      delete bonds[tokenId];
      require(principalToken.transfer(msg.sender, withdrawAmount));

    }

    function positionValue(uint256 tokenId) public view returns(uint256) {
      Bond memory bond = bonds[tokenId];
      uint256 ONE = 10^18;
      if (block.timestamp >= bond.maturity.add(bond.mintingDate)) {
        return bond.principal.mul(ONE.add(bond.interest.mul(bond.maturity)));
      }
      return bond.principal.mul(ONE.add(bond.interest.mul(block.timestamp.sub(bond.mintingDate))));
    }

    function canRedeem(uint256 tokenId) public view returns(bool) {
      Bond memory bond = bonds[tokenId];
      return block.timestamp >= bond.maturity.add(bond.mintingDate);
    }

    
}