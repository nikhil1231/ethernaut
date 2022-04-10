const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners()

  const pres = await ethers.getContractAt("Preservation", process.env.PRESERVATION)

  const injector = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("InjectorLibrary", process.env.INJECTOR);

  console.log("Timezone 1 lib address", await ethers.provider.getStorageAt(pres.address, 0));

  console.log("Injector address", injector.address);
  const tx1 = await pres.setFirstTime(injector.address)
  await tx1.wait()

  console.log("New timezone 1 lib address", await ethers.provider.getStorageAt(pres.address, 0));

  const tx2 = await pres.setFirstTime(owner.address)
  await tx2.wait()

  console.log(`Owner: ${await pres.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
