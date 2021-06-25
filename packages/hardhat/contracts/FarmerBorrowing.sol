// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "tinlake/math/Interest.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface PileLike {
    function total() external view returns(uint);
    function debt(uint) external returns (uint);
    function accrue(uint) external;
    function incDebt(uint, uint) external;
    function decDebt(uint, uint) external;
}

contract FarmerBorrowing is Interest {

    IERC20 public currency;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private loanIds;

    struct Loan {
      uint256 borrowDate;
      uint256 maturity;
      uint256 creditCeiling;
    }

    mapping (uint256 => Loan) public loans;
    mapping (uint256 => address) public borrowers;
    mapping (uint256 => uint256) public balances;
    address public lender;

    // Events
    event Close(uint indexed loan);
    event Issue(address indexed registry_, uint indexed token_);
    event Borrow(uint indexed loan, uint currencyAmount);
    event Withdraw(uint indexed loan, uint currencyAmount, address usr);
    event Repay(uint indexed loan, uint currencyAmount);
    event Recover(uint indexed loan, address usr, uint currencyAmount);
    event Claim(uint indexed loan, address usr);

    constructor(address currency_,  address pile_) ) {
        wards[msg.sender] = 1;
        currency = IERC20(currency_);
        pile = PileLike(pile_);

    }

    modifier owner(uint loan) {
      
      _
    }

    function requestLoan(uint rate, uint creditCeiling, uint maturity) external returns(uint256) {
      //1000000003593629043335673583 12% compounding in seconds
      loanIds.increment();

      uint256 newLoanId = loanIds.current();
      loans[newLoanId] = Loan(block.timestamp, maturity, creditCeiling);
      borrowers[newLoanId] = msg.sender;

      pile.file("rate", rate, rate);
      pile.setRate(newLoanId, rate);
      return newLoanId;
    }


     // starts the borrow process of a loan
    // informs the system of the requested currencyAmount
    // interest accumulation starts with this method
    // the method can only be called if the nft is locked
    // a max ceiling needs to be defined by an oracle
    function borrow(uint loan, uint currencyAmount) external owner(loan) {
        //TODO: debt collateralized
        //require(msg.sender has collateral)
        require(block.timestamp < (safeAdd(loans[loan].maturity, loans[loan].borrowDate));
        pile.accrue(loan);
        pile.incDebt(loan, currencyAmount);
        balances[loan] = safeAdd(balances[loan], currencyAmount);
        require(balances[loan] <= loans[loan].creditCeiling);
        balance = safeAdd(balance, currencyAmount);
        emit Borrow(loan, currencyAmount);
        return newLoanId;

    }


    // transfers the requested currencyAmount to the address of the loan owner
    // the method triggers the reserve to ensure the shelf has enough currency
    function withdraw(uint loan, uint currencyAmount, address usr) external owner(loan) {
        require(currencyAmount <= balances[loan], "withdraw-amount-too-high");

        reserve.balance();
        balances[loan] = safeSub(balances[loan], currencyAmount);
        balance = safeSub(balance, currencyAmount);
        require(currency.transfer(usr, currencyAmount), "currency-transfer-failed");
        emit Withdraw(loan, currencyAmount, usr);
    }

    // repays the entire or partial debt of a loan
    function repay(uint loan, uint currencyAmount) external owner(loan) {
        require(balances[loan] == 0, "withdraw-required-before-repay");
        _repay(loan, msg.sender, currencyAmount);
        emit Repay(loan, currencyAmount);
    }


    function _repay(uint loan, address usr, uint currencyAmount) internal {
        pile.accrue(loan);
        uint loanDebt = pile.debt(loan);

        // only repay max loan debt
        if (currencyAmount > loanDebt) {
            currencyAmount = loanDebt;
        }
        require(currency.transferFrom(usr, address(this), currencyAmount), "currency-transfer-failed");
        pile.decDebt(loan, currencyAmount);
        reserve.balance();
    }

    // locks an nft in the shelf
    // requires an issued loan

    function resetLoanBalance(uint loan) internal {
        uint loanBalance = balances[loan];
        if (loanBalance  > 0) {
            balances[loan] = 0;
            balance = safeSub(balance, loanBalance);
        }
    }

}