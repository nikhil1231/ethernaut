const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const shop = await ethers.getContractAt("Shop", process.env.SHOP)

  const buyer = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("Buyer", process.env.BUYER);

  let tx = await buyer.buy(shop.address, { gasLimit: 1e5 });
  await tx.wait()

  console.log("Is sold: ", await shop.isSold());
  console.log("Price: ", (await shop.price()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
