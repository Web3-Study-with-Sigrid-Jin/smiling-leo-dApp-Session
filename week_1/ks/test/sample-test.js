// chai: 자바스크립트의 테스팅 라이브러리
const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe: greeter라는 컨트랙을 테스트할거야.
// 그리고 그 안에 테스트 함수가 들어감.
// it: 테스트 함수의 묶음들.
// it이 n개 있으면 테스트를 n번 실행한다..
// 하드햇이 로컬 블록체인을 만들어서 로컬에서 테스트할 수 있게 해 준다.
describe("Greeter", function () {
  it('Should do all count tests', async() => {
    const Counter = await ethers.getContractFactory("Counter");
    // deploy 트젝이 날려졌으면 true
    const counter = await Counter.deploy(5);
    // deploy한 컨트랙이 블록이 채굴되고 코드에 접근에 가능해지면 true
    await counter.deployed();

    expect(await counter.deployed())

    console.log(await counter.getCount());
    expect(await counter.getCount()).to.equal(5);

    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();
    await counter.incrementCounter();

    expect(await counter.getCount()).to.equal(10);

    let tx = await counter.incrementCounter();
    // wait until the transaction is mined
    await tx.wait();
    console.log(await counter.getCount());
    expect(await counter.getCount()).to.equal(11);

    tx = await counter.incrementCounter();
    await tx.wait();
    console.log(await counter.getCount());
    expect(await counter.getCount()).to.equal(12);

    tx = await counter.decrementCounter();
    // wait until the transaction is mined
    await tx.wait();
    console.log(await counter.getCount());
    expect(await counter.getCount()).to.equal(11);

    tx = await counter.decrementCounter();
    // wait until the transaction is mined
    await tx.wait();
    console.log(await counter.getCount());
    expect(await counter.getCount()).to.equal(10);
  })

  it('Should return all accounts', async() => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log("I am >>>>", account.address);
    }
  })

  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});