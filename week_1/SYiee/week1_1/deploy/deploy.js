const hre = require("hardhat");

async function main() {
  const contractContext = await hre.ethers.getContractFactory("Counter");
  const myContract = await contractContext.deploy(5);

  await myContract.deployed();

  console.log("Contract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });