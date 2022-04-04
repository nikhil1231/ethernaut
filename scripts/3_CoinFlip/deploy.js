const hre = require("hardhat");

async function deploy() {

  const Guesser = await hre.ethers.getContractFactory("FlipGuesser");
  const guesser = await Guesser.deploy(process.env.COIN_FLIP_ADDR)

  await guesser.deployed()

  console.log("Guesser deployed at " + guesser.address)

  console.log(await guesser.coinFlipAddr())

  return guesser
}

if (require.main === module) {
  deploy()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = {
  deploy
}
