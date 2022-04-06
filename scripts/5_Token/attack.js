const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const token = await ethers.getContractAt("Token", process.env.TOKEN_ADDR);

  const [owner] = await ethers.getSigners()

  console.log(`Starting balance: ${await token.balanceOf(owner.address)}`)

  const tx = await token.transfer(process.env.TOKEN_ADDR, 21)

  await tx.wait()

  console.log(`Ending balance: ${await token.balanceOf(owner.address)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
