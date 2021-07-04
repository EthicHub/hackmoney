pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import './NFTBond.sol';
import "@balancer-labs/v2-vault/contracts/interfaces/IVault.sol";


contract BalancerNFTBond is NFTBond {

  address public vault;
  bytes32 public poolId;
  constructor(address _principalTokenAddress, address _vault, bytes32 _poolId) 
    
    public NFTBond(
      _principalTokenAddress,
      "EthicBondMock",
      "EBM") {
    vault = IVault(_vault);
    poolId = _poolId;
  }

  function _depositInPool(uint256 amount) internal override {
    address assets[1] = [address(principalToken)];
    uint256 maxAmountsIn[1] = [amount];
    //TODO secure limits
    IVault.JoinPoolRequest memory jpr = new IVault.JoinPoolRequest({
        assets: assets, 
        maxAmountsIn: maxAmountsIn,
        userData: abi.encode(['uint256', 'uint256[]'], [0, maxAmountsIn))
        false,
    })
    vault.joinPool(poolId, address(this), address(this), jpr);
  }
  
  function _withdrawFromPool(uint256 amount) internal override {
    address assets[1] = [address(principalToken)];
    uint256 amounts[1] = [amount];
    // TODO secure limites
    IVault.ExitPoolRequest memory jpr = new IVault.JoinPoolRequest({
        assets: assets, 
        minAmountsOut: [0],
        userData: abi.encode(['uint256', 'uint256[]', 'uint256'], [2, amounts, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff])
        false,
    })
    vault.exitPool(poolId, address(this), address(this), jpr);
    
  }

  
}