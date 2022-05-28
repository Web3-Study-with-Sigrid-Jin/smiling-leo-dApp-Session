// chai: 자바스크립트의 테스팅 라이브러리
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

// describe: greeter라는 컨트랙을 테스트할거야.
// it: 테스트 함수의 묶음들.
// it이 n개 있으면 테스트를 n번 실행한다..
// 하드햇이 로컬 블록체인을 만들어서 로컬에서 테스트할 수 있게 해 준다.

// Test
const accounts = [];
ethers.getSigners().then((acc) => {
  acc.map((obj) => {
    accounts.push(obj.address);
  })
});

// Deploy
const ownerAddresss = '0x90B1fe3eB05cb11A2044ea07eAac1235077cfd3D';
const receiverAddresss = '0xB37FeBBb8eBd813f7eBFfa1c2c3D4C312f3c8e3D';

const initSupply = 1000;

describe("MyERC20", function () {
  it('Should assign the total supply of tokens to the owner', async() => {
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myerc20 = await MyERC20.deploy(initSupply);
    expect(await myerc20.deployed());

    const ownerBalance = await myerc20.balanceOf(ownerAddresss);
    const totalSupply = await myerc20.totalSupply();

    console.log('Owner Supply:', await myerc20.totalSupply());
    expect(ownerBalance === totalSupply);
  })

  it("Should transfer tokens between accounts", async function () {
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myerc20 = await MyERC20.deploy(initSupply);
    expect(await myerc20.deployed());

    // Deploy
    let tx = await myerc20.transfer(accounts[1], 100);
    await tx.wait();
    expect(tx);
    });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myerc20 = await MyERC20.deploy(0);
    expect(await myerc20.deployed());

    let tx;

    try { tx = await myerc20.transfer(accounts[1], 100); }
    catch(e) { expect(1).equals(1); }

    if (tx) {
      expect('No Error occured').equals('Expected not enough balance error.');
    }

  });

  it("Should update balances after transfers", async function () {
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myerc20 = await MyERC20.deploy(initSupply);
    expect(await myerc20.deployed());

    const before = await myerc20.balanceOf(accounts[1]);
    const amount = 100;

    // Deploy
    let tx = await myerc20.transfer(accounts[1], amount);
    await tx.wait();
    const after = await myerc20.balanceOf(accounts[1]);

    expect(after.toNumber() - before.toNumber()).to.equal(amount);
  });
});
