const hre = require("hardhat");

async function main() {

  const Guesser = await hre.ethers.getContractFactory("FlipGuesser");
  const guesser = await Guesser.deploy(process.env.COIN_FLIP_ADDR)

  await guesser.deployed()

  console.log("Guesser deployed at " + guesser.address)

  console.log(await guesser.coinFlipAddr())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
