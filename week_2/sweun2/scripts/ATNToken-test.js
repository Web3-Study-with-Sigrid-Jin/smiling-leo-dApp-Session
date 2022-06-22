// ATNToken-test.js

const { italic } = require("ansi-colors");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { add } = require("lodash");

async function main(){

	var ATNToken;
	var owner,addr1,addr2,addrs;
	[owner,addr1,addr2,...addrs]=await ethers.getSigners();
	const ATNTokenFactory = (await ethers.getContractFactory("ATNToken"));
	ATNToken = await ATNTokenFactory.deploy(1000);
	await ATNToken.deployed();
	console.log("ATNToken deployed to:", ATNToken.address);
	console.log("owner balance:", await ATNToken.balanceOf(owner.address));
	console.log("addr1 balance:", await ATNToken.balanceOf(addr1.address));
	console.log("addr2 balance:", await ATNToken.balanceOf(addr2.address));

	const ownerBalance = await ATNToken.balanceOf(owner.address);
	expect(await ATNToken.totalSupply()).to.equal(ownerBalance);

	

			// Transfer 50 tokens from owner to addr1
			
	var tx=await ATNToken.transfer(addr1.address, 50);
	await tx.wait();
	console.log("owner balance:", await ATNToken.balanceOf(owner.address));
	console.log("addr1 balance:", await ATNToken.balanceOf(addr1.address));
	console.log("addr2 balance:", await ATNToken.balanceOf(addr2.address));
	console.log("----------------------------------");


	var addr1Balance = await ATNToken.balanceOf(addr1.address);
	await ATNToken.approve(addr1.address,0)
	await ATNToken.approve(addr1.address,addr1Balance);
	expect(addr1Balance).to.equal(50);

			// Transfer 50 tokens from addr1 to addr2
			// We use .connect(signer) to send a transaction from another account

	tx=await ATNToken.connect(addr1).transfer(addr2.address, 50);
	await tx.wait();
	console.log("owner balance:", await ATNToken.balanceOf(owner.address));
	console.log("addr1 balance:", await ATNToken.balanceOf(addr1.address));
	console.log("addr2 balance:", await ATNToken.balanceOf(addr2.address));
	console.log("----------------------------------");
	var addr2Balance = await ATNToken.balanceOf(addr2.address);
	expect(addr2Balance).to.equal(50);
	console.log(await ATNToken.allowance(owner.address, addr2.address))



	const initialOwnerBalance = await ATNToken.balanceOf(owner.address);
	console.log(initialOwnerBalance)
			// Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
			// `require` will evaluate false and revert the transaction.
	/*await expect(
		ATNToken.connect(addr1).transfer(owner.address, 1)
		).to.be.revertedWith("ERC20: transfer amount exceeds balance");
	
			// Owner balance shouldn't have changed.
	expect(await ATNToken.balanceOf(owner.address)).to.equal(
		initialOwnerBalance
		);*/

			// Transfer 100 tokens from owner to addr1.
	tx=await ATNToken.transfer(addr1.address, 100);
	tx.wait();
			// Transfer another 50 tokens from owner to addr2.
	tx=await ATNToken.transfer(addr2.address, 50);
	tx.wait();
	console.log("owner balance:", await ATNToken.balanceOf(owner.address));
	console.log("addr1 balance:", await ATNToken.balanceOf(addr1.address));
	console.log("addr2 balance:", await ATNToken.balanceOf(addr2.address));
	console.log("----------------------------------");
	console.log("finish")

}


  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});