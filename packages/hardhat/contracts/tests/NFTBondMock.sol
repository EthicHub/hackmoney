pragma solidity 0.7.6;

import '../NFTBond.sol';

contract NFTBondMock is NFTBond {

  address public pool;
  constructor(address _principalTokenAddress, address _pool) 
    public NFTBond(
      _principalTokenAddress,
      "EthicBondMock",
      "EBM") {
    pool = _pool;

  }

  function _depositInPool(uint256 amount) internal override {
    principalToken.transfer(pool, amount);
  }
  function _withdrawFromPool(uint256 amount) internal override {
    principalToken.transferFrom(pool, address(this), amount);
  }

  
}