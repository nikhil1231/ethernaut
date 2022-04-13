const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const donor = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Donor", process.env.DONOR_ADDR);

  const tx = await donor.give(process.env.FORCE_ADDR, {
    value: 1
  })

  await tx.wait()

  console.log(`Contract balance: ${await ethers.provider.getBalance(process.env.FORCE_ADDR)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
