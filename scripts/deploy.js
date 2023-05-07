const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const RoboPunksNFT = await hre.ethers.getContractFactory("RoboPunksNFT");
  const contract = await RoboPunksNFT.deploy();
  await contract.deployed();
  console.log(
    "Owner address: ",
    owner.address,
    " contract address: ",
    contract.address
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
