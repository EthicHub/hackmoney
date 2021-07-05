// SPDX-License-Identifier: UNLICENSED0

pragma solidity 0.7.6;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IIdleToken.sol";

//idleLBP- idle lending borrowing pool
contract ImplementIdle{
    
    IERC20 DaiInstance;
    IIdleToken IdleTokenInstance;
    
    address daiAddress = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa; //test erc20 token on kovan
    address IdleTokenAddress = 0x295CA5bC5153698162dDbcE5dF50E436a58BA21e; //IdleTokenAddress on kovan idleDai
    
    
    
    
    constructor(){
        //instantiate Idle and Dai Token
        
        DaiInstance = IERC20(daiAddress);
        IdleTokenInstance = IIdleToken(IdleTokenAddress);
    
    }   
    

  
  //@front-endDev should call approve function for this contract from token contract before calling this function
    
    function depositForLend(uint256 _amount) public payable returns(uint256){
      DaiInstance.approve(address(this), _amount);
     DaiInstance.transferFrom(msg.sender, address(this), _amount);
    DaiInstance.approve(address(IdleTokenInstance), _amount);
      uint256 idleBalance = IdleTokenInstance.mintIdleToken(_amount, false, address(this));
      return idleBalance;
    }
    
    //redeem funds and burn idle Tokens based on amount
    function redeemFunds(uint256 _amount) public returns(uint256){
      uint256 redeemedToken = IdleTokenInstance.redeemIdleToken(_amount);
      return redeemedToken;
    }
    
    //check current value of idleToken
    function idleTokenPrice() public view returns(uint256){
    uint256 price = IdleTokenInstance.tokenPrice();
        return price;
    }
   
   
    
    //check all interest-bearing Tokens
   
    function InterestTokens() public view returns (address[] memory addresses, uint256[] memory aprs){
        return IdleTokenInstance.getAPRs();
    }

    
    
    function checkDaiBalance() public view returns(uint256){
        return DaiInstance.balanceOf(msg.sender);
    }





}

