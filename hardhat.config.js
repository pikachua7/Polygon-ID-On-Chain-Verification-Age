require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `MUMBAI_RPC_URL`,
      accounts: [`YOUR_PRIVATE_KEY`],
    }
  }
};
