const hre = require("hardhat");

require('dotenv').config()

async function deploy(...args) {

  const Contract = await hre.ethers.getContractFactory("Acceptance");
  const contract = await Contract.deploy(...args)

  await contract.deployed()

  console.log("Deployed at " + contract.address)

  return contract
}

if (require.main === module) {
  deploy(process.env.DENIAL)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = {
  deploy
}
