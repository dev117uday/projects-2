const Web3 = require('web3')
require("dotenv").config()
const INFURA_KEY = process.env.INFURA_KEY

let web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_KEY}`)

module.exports = {
	web3
}