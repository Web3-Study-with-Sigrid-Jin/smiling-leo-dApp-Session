const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Conuter", function () {
  it("Test", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(5);
    await counter.deployed();

    const tx = await counter.incrementCounter();
    await tx.wait();

    expect(await counter.getCount()).to.equal(6);

    const tx2 = await counter.decrementCounter();
    await tx2.wait();

    expect(await counter.getCount()).to.equal(5);
  });
});