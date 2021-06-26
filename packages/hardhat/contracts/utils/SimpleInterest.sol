pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract SimpleInterest {

  using SafeMath for uint256;

  uint256 immutable ONE = 10^18;
  uint256 immutable SECONDS_IN_YEAR = 31556952;

  function simpleInterest(uint256 principal, uint256 interest, uint256 elapsedTime) internal view returns (uint256) {
    return principal.mul(ONE.add(interest.mul(elapsedTime.div(SECONDS_IN_YEAR))).div(100));
  }
}