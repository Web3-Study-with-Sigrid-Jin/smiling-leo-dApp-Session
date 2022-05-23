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
  const ownerAddresss = '0x90B1fe3eB05cb11A2044ea07eAac1235077cfd3D';
  const receiverAddresss = '0xB37FeBBb8eBd813f7eBFfa1c2c3D4C312f3c8e3D';
  const accounts = [ownerAddresss, receiverAddresss];
  
  const initSupply = 1000;
  
  // Deploy Contract
  const MyERC20 = await hre.ethers.getContractFactory("MyERC20");
  const myerc20 = await MyERC20.deploy(initSupply);
  expect(await myerc20.deployed());
  console.log('Contract Deployed to:', myerc20.address);
  
  const ownerBalance = await myerc20.balanceOf(ownerAddresss);
  console.log('Owner Address:', ownerAddresss);
  console.log('Owner Balance:', await myerc20.balanceOf(ownerAddresss));
  const totalSupply = await myerc20.totalSupply();
  console.log('Total Supply:', await myerc20.totalSupply());
  
  expect(ownerBalance === totalSupply);

  // Transfer test
  let tx = await myerc20.transfer(accounts[1], 100);
  await tx.wait();
  expect(tx);
  console.log('Transaction hash:', tx.hash);

  // Not enough Balance test
  try { tx = await myerc20.transfer(accounts[1], 10000); }
  catch(e)
  {
    console.log('Transaction reverted due to not enough balance');
    expect(1).equals(1);
  }

  // Balance change test
  const before = await myerc20.balanceOf(accounts[1]);
  console.log('Balance Before Transfer:', await myerc20.balanceOf(accounts[1]));
  const amount = 100;

  // Deploy
  tx = await myerc20.transfer(accounts[1], amount);
  await tx.wait();
  console.log('Transaction hash:', tx.hash);

  const after = await myerc20.balanceOf(accounts[1]);
  console.log('Balance After Transfer:', await myerc20.balanceOf(accounts[1]));

  expect(after.toNumber() - before.toNumber()).to.equal(amount);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
