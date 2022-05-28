require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
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
  solidity: "0.8.0",
  networks: {
    Rinkeby: {
      url: `${process.env.RINKEBY_ALLTHATNODE_API_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier:1,
      
      blockGasLimit: 100000000429720 // whatever you want here
    
    },
    Kovan:{
      url: `${process.env.KOVAN_ALLTHATNODE_API_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier:1
    },
    Goerli: {
      url: `${process.env.GOERLI_ALCHEMY_API_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier:1
    },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_APIKEY}`
  }

};