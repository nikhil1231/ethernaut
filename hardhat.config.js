require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const RINKEBY = `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: RINKEBY,
      }
    },
    rinkeby: {
      url: RINKEBY,
      accounts: [process.env.PK]
    }
  }
};
