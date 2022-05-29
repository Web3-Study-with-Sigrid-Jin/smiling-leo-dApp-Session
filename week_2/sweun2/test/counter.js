
const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe("Conuter", function () {
  it("Test", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(5);

    await await counter.deployed();
    await await counter.incrementCounter();

    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();

    await expect(await counter.getCount()).to.equal(10);
    await counter.incrementCounter();

    await expect(await counter.getCount()).to.equal(11);

    await counter.incrementCounter();
    await expect(await counter.getCount()).to.equal(12);

    await await counter.decrementCounter();

    await expect(await counter.getCount()).to.equal(11);

    await counter.decrementCounter();

    await expect(await counter.getCount()).to.equal(10);
  });

  

  
});


