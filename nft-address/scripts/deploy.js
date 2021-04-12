const hre = require("hardhat");

async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("ethAddress");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Greeter deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
