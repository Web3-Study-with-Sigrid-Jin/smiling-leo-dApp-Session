require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
const MNEMONIC = process.env.MNEMONIC
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
    rinkeby: {
      url : "https://eth-rinkeby.alchemyapi.io/v2/mLam9tBGKZkYt8r0Z4XvhEMrUmXGDkwx",
      //url: "https://ethereum-rinkeby-rpc.allthatnode.com/xRCdD8a1OQhGa8dqj2YBJBtVRM0wwCZf`",
      accounts: {
        mnemonic: MNEMONIC
      },
      //accounts: [`${RINKEBY_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true
    },
    
    baobab : {
      //url: "https://api.baobab.klaytn.net:8651",
      url : "https://klaytn-baobab-rpc.allthatnode.com:8551/xtrjlPlcpUy06oDLelvv9TPCDr9PUUFy",
      accounts: {
        mnemonic: MNEMONIC
      },
      //network_id: 1001,
      gas: 8500000,
      gasPrice: 2500000000000,
      saveDeployments: true
    }
    
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }

};