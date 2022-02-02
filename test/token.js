const {expect} = require("chai");

// describe("Token contract", function(){
//     it("Deployment should assign the total supply of tokens to the owner", async function(){
//         const [owner] = await ethers.getSigners();  //used to make transactions
//         console.log("Signer object", owner);
//         const Token = await ethers.getContractFactory("Token"); //Contract instance

//         const hardhatToken = await Token.deploy(); // deploy contract

//         const ownerBalance = await hardhatToken.getBalance(owner.address); //get owner balance
//         console.log("Owner address", owner.address);
//         console.log("Owner balance", ownerBalance);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // check total supply matches with owner balance
//     });

//     it("Should transfer token between the accounts", async function(){
//         const [owner, addr1, addr2] = await ethers.getSigners();  //used to make transactions

//         const Token = await ethers.getContractFactory("Token"); //Contract instance

//         const hardhatToken = await Token.deploy(); // deploy contract

//         // transfer 10 tokens from owner to addr1
//         await hardhatToken.transfer(addr1.address, 10);
//         expect(await hardhatToken.getBalance(addr1.address)).to.equal(10);

//         //Transfer 5 tokens from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address, 3);

//         //verify both addr1, addr2 balances
//         expect(await hardhatToken.getBalance(addr1.address)).to.equal(7);
//         expect(await hardhatToken.getBalance(addr2.address)).to.equal(3);
//     });
// });

describe("Token contract", async () => {
    let Token, owner, addr1, addr2, addrs, hardhatToken;

    beforeEach(async () => {
        //get owner and address for transaction
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        //get token factory
        Token = await ethers.getContractFactory("Token");
        hardhatToken = await Token.deploy(); // deploy the contract
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            const currentOwner = await hardhatToken.owner();
            expect(currentOwner).to.equal(owner.address);
        });

        it("Transactions - Transfer between the accounts", async () => {
            //Transfer tokens from owner to addr1
            await hardhatToken.transfer(addr1.address, 10);

            //Transfer tokens from addr1 to addr2
            const addr1BalanceBeforeTransfer = await hardhatToken.getBalance(addr1.address);
            //check addr1 balance before transfer
            expect(addr1BalanceBeforeTransfer).to.be.gte(4);
            await hardhatToken.connect(addr1).transfer(addr2.address, 4);

            //Check balance of owner
            const ownerBalanceAfterTransfer = await hardhatToken.getBalance(owner.address);
            expect(ownerBalanceAfterTransfer).to.be.equal(10000-10);

            //Check balance of addr1
            const addr1BalanceAfterTransfer = await hardhatToken.getBalance(addr1.address);
            expect(addr1BalanceAfterTransfer).to.be.equal(6);

            //Check balance of addr2
            const addr2Balance = await hardhatToken.getBalance(addr2.address);
            expect(addr2Balance).to.be.equal(4);
        });

        it("Should fail if sender doesnt have enough tokens", async() => {
            const ownerBalanceBeforeTransfer = await hardhatToken.getBalance(owner.address);

            //transfer from addr1 to addr2
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Insufficient tokens");

            //check owner balance after txn
            const ownerBalanceAfterTransfer = await hardhatToken.getBalance(owner.address);
            expect(ownerBalanceAfterTransfer).to.be.equal(ownerBalanceBeforeTransfer);
        });

        it("Update balances after transfers", async () => {
            const ownerBalanceBeforeTransfer = await hardhatToken.getBalance(owner.address);

            //transfer to addr1
            await hardhatToken.transfer(addr1.address, 7);
            await hardhatToken.transfer(addr2.address, 3);

            // verify the balances after transfer
            const ownerBalanceAfterTransfer = await hardhatToken.getBalance(owner.address);
            expect(ownerBalanceAfterTransfer).to.be.equal(10000-7-3);

            const addr1Balance = await hardhatToken.getBalance(addr1.address);
            expect(addr1Balance).to.be.equal(7);

            const addr2Balance = await hardhatToken.getBalance(addr2.address);
            expect(addr2Balance).to.be.equal(3);

        });
    });
});