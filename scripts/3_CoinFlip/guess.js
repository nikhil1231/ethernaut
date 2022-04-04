const hre = require("hardhat");
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const coinFlip = await ethers.getContractAt("CoinFlip", process.env.COIN_FLIP_ADDR);

  const guesser = hre.network.name == "hardhat"
    ? await deploy()
    : await ethers.getContractAt("FlipGuesser", process.env.COIN_GUESS_ADDR);

  for (let i = 0; i < 10; i++) {
    const tx = await guesser.guess()
    await tx.wait()

    console.log(await coinFlip.consecutiveWins());
  }

}

async function deploy() {
  const Guesser = await ethers.getContractFactory("FlipGuesser");
  const guesser = await Guesser.deploy(process.env.COIN_FLIP_ADDR)

  await guesser.deployed()

  return guesser
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
