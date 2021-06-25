// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IIdleToken.sol";

//idleLBP- idle lending borrowing pool
contract ImplementIdle{
    
    IERC20 DaiInstance;
    IIdleToken IdleTokenInstance;
    
    address daiAddress = 0x6D98C2a27E5a6867AE258006718803B670d723Cd; //test erc20 token on kovan
    address IdleTokenAddress = 0xAB6Bdb5CCF38ECDa7A92d04E86f7c53Eb72833dF; //IdleTokenAddress on kovan
    
    
    
    
    constructor(){
        //instantiate Idle and Dai Token
        
        DaiInstance = IERC20(daiAddress);
        IdleTokenInstance = IIdleToken(IdleTokenAddress);
    
    }   
    
    
    function depositForLend(uint256 _amount) public payable returns(uint256){
        require(DaiInstance.balanceOf(msg.sender) >= _amount, 'Insufficient balance');
        uint256 idleBalance = IdleTokenInstance.mintIdleToken(_amount, false, msg.sender);
        return idleBalance;
    }
    

}

