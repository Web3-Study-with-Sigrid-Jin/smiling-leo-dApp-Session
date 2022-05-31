require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `${process.env.ALLTHATNODE_RINKEBY_URL}`,
      accounts: [`${process.env.PRIVATE_KEY_RINKEBY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier:1
    },
    baobab: {
      url: `${process.env.ALLTHATNODE_BAOBAB_URL}`,
      accounts: [`${process.env.PRIVATE_KEY_BAOBAB}`],
      chainId: 1001,
      gas: 15000000,
      gasPrice: 250000000000
    }
  }  
};