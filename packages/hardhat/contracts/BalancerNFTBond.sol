pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import './NFTBondBase.sol';
import "@balancer-labs/v2-vault/contracts/interfaces/IVault.sol";


contract BalancerNFTBond is NFTBondBase {

  IVault public vault;
  bytes32 public poolId;
  constructor(address _principalTokenAddress, address _vault, bytes32 _poolId) 
    
    public NFTBondBase(
      _principalTokenAddress,
      "EthicBondMock",
      "EBM") {
    principalToken.approve(_vault, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

    vault = IVault(_vault);
    poolId = _poolId;
  }

  function _depositInPool(uint256 amount) internal override {
    IAsset[] memory assets = new IAsset[](2);
    assets[0] = IAsset(address(principalToken));
    assets[1] = IAsset(address(0));

    uint256[] memory maxAmountsIn = new uint256[](2);
    maxAmountsIn[0] = amount;
    maxAmountsIn[1] = 0;
    /*
    IVault.JoinPoolRequest memory jpr = IVault.JoinPoolRequest({
        assets: assets, 
        maxAmountsIn: maxAmountsIn,
        userData: abi.encodePacked(['uint256', 'uint256[]', 'uint256'], [1, maxAmountsIn, 0]), // <------ no nested arrays...
        fromInternalBalance: false
    });
    vault.joinPool(poolId, address(this), address(this), jpr);
    */
  }

  
  
  function _withdrawFromPool(uint256 amount) internal override {
    address[1] memory assets = [address(principalToken)];
    uint256[1] memory amounts = [amount];

    // TODO
    /*
    IVault.ExitPoolRequest memory jpr = new IVault.JoinPoolRequest({
        assets: assets, 
        minAmountsOut: [0],
        userData: abi.encode(['uint256', 'uint256[]', 'uint256'], [2, amounts, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff]),
        fromInternalBalance: false
    });
    vault.exitPool(poolId, address(this), address(this), jpr);
    */
  }

  
}