require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// const INFURA_API_KEY = "ad26acf72e0945038f8d9fb33112f8e8"
const PRIVATE_KEY = "452c9e812af4df5d8f2ac3937bd2be5fb16b238206453f31b490d057405542e8"

module.exports = {
  solidity: "0.8.3",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/ad26acf72e0945038f8d9fb33112f8e8`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}
