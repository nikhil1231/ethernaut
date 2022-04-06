const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const Telephone = await ethers.getContractAt("Telephone", process.env.TELEPHONE_ADDR);

  const caller = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Caller", process.env.CALLER_ADDR);

  const [owner] = await ethers.getSigners()

  console.log("Owner should be " + owner.address)

  await caller.call(owner.address)

  console.log(await Telephone.owner());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
