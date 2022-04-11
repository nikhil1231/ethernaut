const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const den = await ethers.getContractAt("Denial", process.env.DENIAL)

  const acc = hre.network.name == "hardhat"
    ? await deploy(den.address)
    : await ethers.getContractAt("Acceptance", process.env.ACCEPTANCE);

  console.log(`Denial balance: ${await den.contractBalance()}`)

  let tx = await den.setWithdrawPartner(acc.address);
  await tx.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
