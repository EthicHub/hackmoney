// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


import "./RewardsAssetManager.sol";
import "./balancer-labs/v2-distributors/contracts/interfaces/IMultiRewards.sol";
import "./IReserve.sol";

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract EthicHubAssetManager is RewardsAssetManager, IReserve {
    uint16 public constant REFERRAL_CODE = 0;

    //IERC20 public immutable aToken;
    //IERC20 public immutable stkAave;

    // @notice rewards distributor for pool which owns this asset manager
    IMultiRewards public distributor;
    address public borrowingManager; // Handles borrowing for farmers
    //Pile public pie; // Handles debt calculation

    constructor(
        IVault _vault,
        IERC20 _token,
        //Pile _pile,
        address _borrowingManager
    ) RewardsAssetManager(_vault, bytes32(0), _token) {

        //pile = _pile;
        _token.approve(_borrowingManager, type(uint256).max);
    }

    /**
     * @dev Should be called in same transaction as deployment through a factory contract
     * @param pId - the id of the pool
     * @param rewardsDistributor - the address of the rewards contract (to distribute stkAAVE)
     */
    function initialize(bytes32 pId, address rewardsDistributor) public {
        _initialize(pId);

        distributor = IMultiRewards(rewardsDistributor);
        IERC20 poolAddress = IERC20((uint256(poolId) >> (12 * 8)) & (2**(20 * 8) - 1));
        //distributor.whitelistRewarder(poolAddress, stkAave, address(this));
        //distributor.addReward(poolAddress, stkAave, 1);

        //stkAave.approve(rewardsDistributor, type(uint256).max);
    }

    /**
     * @dev Deposits capital into idleFinance
     * @param amount - the amount of tokens being deposited
     * @return the amount deposited
     */
    function _invest(uint256 amount, uint256) internal override returns (uint256) {
        // TODO: deposits capital into idleFinance
        return amount;
    }

    /**
     * @dev Withdraws capital out of idleFinance
     * @param amount - the amount to withdraw
     * @return the number of tokens to return to the vault
     */
    function _divest(uint256 amount, uint256) internal override returns (uint256) {
        // TODO: withdraw capital from idleFinance
        //return lendingPool.withdraw(address(token), amount, address(this));
    }

    /**
     * @dev Checks AToken balance (ever growing)
     */
    function _getAUM() internal view override returns (uint256) {
        // TODO 
        // return balance in idle + total outstanding debt in FarmerBorrowing
        return 0; //aToken.balanceOf(address(this));
    }

    /**
    Farmers want to borrow liquidity
     */
    function requestLiqudity(uint amount) external override {
      if (token.balanceOf(address(this)) < amount) {
        _divest(amount, 0);
      }
      token.transfer(borrowingManager, amount);
    }

    /*
      Farmers repaying loan
    */
    function returnLiquidity(uint amount) external override {
      token.transferFrom(borrowingManager, address(this), amount);
      _invest(amount, 0);
    }

    /*
    function claimRewards() public {
        // Claim stkAave from incentives controller
        address[] memory assets = new address[](1);
        assets[0] = address(aToken);
        aaveIncentives.claimRewards(assets, type(uint256).max, address(this));

        // Forward to distributor
        IERC20 poolAddress = IERC20((uint256(poolId) >> (12 * 8)) & (2**(20 * 8) - 1));

        distributor.notifyRewardAmount(poolAddress, stkAave, stkAave.balanceOf(address(this)));
    }*/
}