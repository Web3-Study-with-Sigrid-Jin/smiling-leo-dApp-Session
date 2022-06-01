const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Conuter", function () {
  it("Test", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(5);
    await counter.deployed();

    let promises = [];
    for(let i=0; i < 5; i++) {
        let tx = await counter.incrementCounter();
        promises.push(tx.wait());       
    }
    
    await Promise.all(promises);

    expect(await counter.getCount()).to.equal(10);

    tx = await counter.incrementCounter();
    await tx.wait();

    expect(await counter.getCount()).to.equal(11);

    tx = await counter.incrementCounter();
    await tx.wait();

    expect(await counter.getCount()).to.equal(12);

    tx = await counter.decrementCounter();
    await tx.wait();

    expect(await counter.getCount()).to.equal(11);

    tx = await counter.decrementCounter();
    await tx.wait();

    expect(await counter.getCount()).to.equal(10);
  });
});