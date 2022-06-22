// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { expect } = require("chai");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Counter = await hre.ethers.getContractFactory("Counter");
  // deploy 트젝이 날려졌으면 true
  const counter = await Counter.deploy(5);
  // deploy한 컨트랙이 블록이 채굴되고 코드에 접근에 가능해지면 true
  await counter.deployed();
  console.log("Counter deployed to:", counter.address);

  expect(await counter.deployed())

  console.log(await counter.getCount());
  expect(await counter.getCount()).to.equal(5);

  // 6
  let tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());

  // 7
  tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());

  // 8
  tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());

  // 9
  tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());

  // 10
  tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());

  expect(await counter.getCount()).to.equal(10);

  // 11
  tx = await counter.incrementCounter();
  // wait until the transaction is mined
  await tx.wait();
  console.log(await counter.getCount());
  expect(await counter.getCount()).to.equal(11);

  // 12
  tx = await counter.incrementCounter();
  await tx.wait();
  console.log(await counter.getCount());
  expect(await counter.getCount()).to.equal(12);

  // 11
  tx = await counter.decrementCounter();
  // wait until the transaction is mined
  await tx.wait();
  console.log(await counter.getCount());
  expect(await counter.getCount()).to.equal(11);

  // 10
  tx = await counter.decrementCounter();
  // wait until the transaction is mined
  await tx.wait();
  console.log(await counter.getCount());
  expect(await counter.getCount()).to.equal(10);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
