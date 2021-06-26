pragma solidity 0.7.6;

import "../IReserve.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ReserveMock is IReserve {

  IERC20 currency;
  address borrowingContract;

  constructor(address _currency) {
    currency = IERC20(_currency);
  }

  function setBorrowingContract(address _borrowingContract) external {
    borrowingContract = _borrowingContract;
  }

  function requestLiqudity(uint amount) external override {
    currency.transfer(borrowingContract, amount);
  }

  function returnLiquidity(uint amount) external override {
    currency.transferFrom(borrowingContract, address(this), amount);
  }

}