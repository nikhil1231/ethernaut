const hre = require("hardhat");
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

async function main() {

  const elevator = await ethers.getContractAt("Elevator", process.env.ELEVATOR_ADDR)

  const building = hre.network.name == "hardhat"
    ? await deploy(elevator.address)
    : await ethers.getContractAt("Building", process.env.BUILDING_ADDR);

  await building.goTo(69);

  console.log(`Is elevator at top: ${await elevator.top()}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
