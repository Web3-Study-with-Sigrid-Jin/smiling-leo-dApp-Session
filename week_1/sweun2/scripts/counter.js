const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(5);
  await counter.deployed();
  console.log("Counter deployed to:", counter.address);
  var tx= await(await counter.incrementCounter());
  await tx.wait();
  tx=await counter.incrementCounter();
  await tx.wait();
  tx=await counter.incrementCounter();
  await tx.wait();
  tx=await counter.incrementCounter();
  await tx.wait();
  tx=await counter.incrementCounter();
  await tx.wait();

  expect(await counter.getCount()).to.equal(10);

  tx=await counter.incrementCounter();
  await tx.wait();

  expect(await counter.getCount()).to.equal(11);

  tx=await counter.incrementCounter();
  await tx.wait();

  expect(await counter.getCount()).to.equal(12);

  tx= await counter.decrementCounter();
  await tx.wait();

  expect(await counter.getCount()).to.equal(11);

  tx=await counter.decrementCounter();
  await tx.wait();

  expect(await counter.getCount()).to.equal(10);
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});






