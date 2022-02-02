//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";
contract Token{
    string public name = "Aarav Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;
    
    address public owner;

    mapping(address => uint256) balances;
    constructor(){
        balances[msg.sender]=totalSupply;
        owner=msg.sender;
    }

    function transfer(address to, uint amount) external{
        require(balances[msg.sender]>=amount, "Insufficient tokens");

        console.log("**** %s  IS TRANSFERING %s TOKENS TO %s", msg.sender, amount, to);

        balances[msg.sender]-=amount; // balances[msg.sender] = balances[msg.sender] - amount;
        console.log("**** Sender balance is %s tokens", balances[msg.sender]);

        balances[to]+=amount; // balances[msg.sender] = balances[msg.sender] - amount;
        console.log("**** Receiver balance is %s tokens", balances[to]);
    }

    function getBalance(address account) external view returns(uint){
        console.log("**** Current balance of %s is %s tokens", account, balances[account]);
        return balances[account];
    }
}