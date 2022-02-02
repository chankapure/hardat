# hardat

**PREREQUISITE:**

1. Solidity
2. Basic Javascript

**INSTALLATION**

> npx hardhat
> create 'contracts', 'scripts' & 'test' folders inside the project folder.
> npm install --save-dev @nomiclabs/hardhat-waffle 
> npm install --save-dev ethereum-waffle 
> npm install --save-dev chai 
> npm install --save-dev @nomiclabs/hardhat-ethers ethers

**COMPILATION**

1. contracts/token.sol
2. write code for transfer & checking balance
3. cd ./contracts
4. npx hardhat compile

-**TEST CASES USING CHAI**

1. Transfer amount from Owner to Addr1
2. Transfer amount from Owner to Addr2
3. Transfer amount from Addr1 to Addr2
4. Check sender balance before sending. [sender should have sufficient balance]
5. Verify the account balances after successful transfer.

Write all the above test cases in **'test'** folder.

**DEBUGGING**

import below module to use **import "hardhat/console.sol"**
