
const hre = require("hardhat");

var Contract;
var contract;

(async function main() {
    // await hre.run('compile');

    // We get the contract to deploy
    Contract = await hre.ethers.getContractFactory("ethAddress");
    contract = await Contract.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
})()

async function getAddressDict(key) {
    let data = await contract.getAddressDictContract(key);
    if (data === "0x0000000000000000000000000000000000000000") {
        return "error"
    }
    return data
}

//
// async function setAddress(key) {
//   let data = await contract.getAddress(key);
//   if (data == "0x0000000000000000000000000000000000000000") {
//     return "error"
//   }
//   return data
// }

module.exports = { getAddressDict }
