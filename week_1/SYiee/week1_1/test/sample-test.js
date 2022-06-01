const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  
  it("Test", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(5); //deploay하는 tx가 써질 때까지 기다리기
    await counter.deployed();

    //incrementCounter 5번 실행
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();

    //값이 10이 되는지 확인
    expect(await counter.getCount()).to.equal(10);

    //incrementCounter 1번 실행 + 값이 11이 되는지 확인
    await counter.incrementCounter();
    expect(await counter.getCount()).to.equal(11);

    //incrementCounter 2번 실행 + 값이 12이 되는지 확인
    await counter.incrementCounter();
    expect(await counter.getCount()).to.equal(12);

    //decrementCounter 2번 실행 + 값이 11이 되는지 확인
    await counter.decrementCounter();
    expect(await counter.getCount()).to.equal(11);

    //decrementCounter 2번 실행 + 값이 10이 되는지 확인
    await counter.decrementCounter();
    expect(await counter.getCount()).to.equal(10);
  });

});
