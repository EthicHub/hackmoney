pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import './NFTBond.sol';
import "@balancer-labs/v2-vault/contracts/interfaces/IVault.sol";


contract BalancerNFTBond is NFTBond {

  IVault public vault;
  bytes32 public poolId;
  constructor(address _principalTokenAddress, address _vault, bytes32 _poolId) 
    
    public NFTBond(
      _principalTokenAddress,
      "EthicBondMock",
      "EBM") {
    principalToken.approve(_vault, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);

    vault = IVault(_vault);
    poolId = _poolId;
  }

  function _depositInPool(uint256 amount) internal override {
    address[1] memory assets = [address(principalToken)];
    uint256[1] memory maxAmountsIn = [amount];
    //TODO secure limits
    /*
    IVault.JoinPoolRequest memory jpr = new IVault.JoinPoolRequest({
        assets: assets, 
        maxAmountsIn: maxAmountsIn,
        userData: abi.encode(['uint256', 'uint256[]'], [0, maxAmountsIn]),
        fromInternalBalance: false
    });
    vault.joinPool(poolId, address(this), address(this), jpr);*/
  }

  function depo(uint256 amount, bytes calldata userData) external {
    IAsset[] memory assets = new IAsset[](1);
    assets[0] = IAsset(address(principalToken));

    uint256[] memory maxAmountsIn = new uint256[](1);
    maxAmountsIn[0] = amount;
    //TODO secure limits
    IVault.JoinPoolRequest memory jpr = IVault.JoinPoolRequest({
        assets: assets, 
        maxAmountsIn: maxAmountsIn,
        userData: userData,//abi.encode(['uint256', 'uint256[]'], [0, maxAmountsIn]),
        fromInternalBalance: false
    });
    vault.joinPool(poolId, address(this), address(this), jpr);
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