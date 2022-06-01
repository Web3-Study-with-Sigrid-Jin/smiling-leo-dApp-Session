const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(5);
  await counter.deployed();
  console.log("Counter deployed to:", counter.address);

  await(await counter.incrementCounter());
  console.log(await counter.getCount())
  await counter.incrementCounter();
  await counter.incrementCounter();
  await counter.incrementCounter();
  await counter.incrementCounter();

  expect(await counter.getCount()).to.equal(10);

  await counter.incrementCounter();

  expect(await counter.getCount()).to.equal(11);

  await counter.incrementCounter();

  expect(await counter.getCount()).to.equal(12);

  await counter.decrementCounter();

  expect(await counter.getCount()).to.equal(11);

  await counter.decrementCounter();

  expect(await counter.getCount()).to.equal(10);
  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});






