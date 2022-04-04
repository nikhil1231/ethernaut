const hre = require("hardhat");

async function deploy() {

  const Contract = await hre.ethers.getContractFactory("Caller");
  const contract = await Contract.deploy(process.env.TELEPHONE_ADDR)

  await contract.deployed()

  console.log("Deployed at " + contract.address)

  return contract
}

if (require.main === module) {
  deploy()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = {
  deploy
}
