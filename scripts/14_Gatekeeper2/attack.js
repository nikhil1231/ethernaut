const hre = require("hardhat");
const deploy = require("./deploy").deploy
const deployTest = require("./deploy_test").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  let gk = await ethers.getContractAt("GatekeeperTwo", process.env.GK2)
  if (hre.network.name == "hardhat") {
    gk = await deployTest();
  }

  const crasher = hre.network.name == "hardhat"
    ? await deploy(gk.address)
    : await ethers.getContractAt("GateCrasherTwo", process.env.GC2);

  console.log(`Entrant: ${await gk.entrant()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
