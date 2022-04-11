const hre = require("hardhat");
const fs = require('fs')
const deploy = require("./deploy").deploy
const ethers = hre.ethers;

require('dotenv').config()

const CREATION_PATH = './scripts/18_MagicNumber/creation.evm'
const BYTECODE_PATH = './scripts/18_MagicNumber/runtime.evm'
const ARTIFACT_PATH = './artifacts/contracts/18_MagicNumber.sol/Solver.json'

async function main() {

  const creation = fs.readFileSync(CREATION_PATH).toString()
  const bytecode = fs.readFileSync(BYTECODE_PATH).toString()

  const c = await hre.artifacts.readArtifact("Solver")

  c.bytecode = creation + bytecode.substring(2) // remove the 0x
  c.deployedBytecode = bytecode

  fs.writeFileSync(ARTIFACT_PATH, JSON.stringify(c))

  const solver = hre.network.name == "hardhat"
  ? await deploy()
  : await ethers.getContractAt("Solver", process.env.SOLVER);

  const meaningHex = await solver.whatIsTheMeaningOfLife()
  console.log("Meaning of life:", meaningHex.toString());

  const magicNum = await ethers.getContractAt("MagicNum", process.env.MAGNUM)
  const tx = await magicNum.setSolver(solver.address);

  await tx.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
