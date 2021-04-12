const fs = require('fs')
require("dotenv").config()
const web3 = require("./web3").web3
const USDC_ADDRESS = process.env.USDC_ADDRESS

let filePath = "./abi/yUSDCV3_ABI.json"
let abi = JSON.parse(fs.readFileSync(filePath))
const yUSDC = new web3.eth.Contract(abi, USDC_ADDRESS)

let yUSDCData = {
	name: "usdc",
}

async function getUSDCData() {
	await yUSDC.methods.getPricePerFullShare().call(function (err, result) {
		if (err) {
			return "Error in getPricePerFullShare : yUSDC"
		} else {
			yUSDCData['getPricePerFullShare'] = result
		}
	})

	await yUSDC.methods.calcPoolValueInToken().call(function (err, result) {
		if (err) {
			return "Error in calcPoolValueInToken : yUSDC"
		} else {
			yUSDCData['calcPoolValueInToken'] = result
		}
	})

	await yUSDC.methods.totalSupply().call(function (err, result) {
		if (err) {
			return "Error in totalSupply : yUSDC"
		} else {
			yUSDCData['totalSupply'] = result
		}
	})


	await yUSDC.methods.balanceDydxAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceDydxAvailable : yUSDC"
		} else {
			yUSDCData['balanceDydxAvailable'] = result
		}
	})

	await yUSDC.methods.balanceDydx().call(function (err, result) {
		if (err) {
			return "Error in balanceDydx : yUSDC"
		} else {
			yUSDCData['balanceDydx'] = result
		}
	})

	await yUSDC.methods.balanceAaveAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceAaveAvailable : yUSDC"
		} else {
			yUSDCData['balanceAaveAvailable'] = result
		}
	})

	await yUSDC.methods.balanceAave().call(function (err, result) {
		if (err) {
			return "Error in balanceAave : yUSDC"
		} else {
			yUSDCData['balanceAave'] = result
		}
	})


	await yUSDC.methods.balanceCompound().call(function (err, result) {
		if (err) {
			return "Error in balanceCompound : yUSDC"
		} else {
			yUSDCData['balanceCompound'] = result
		}
	})

	await yUSDC.methods.balanceCompoundInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceCompoundInToken : yUSDC"
		} else {
			yUSDCData['balanceCompoundInToken'] = result
		}
	})

	await yUSDC.methods.balanceFulcrumAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumAvailable : yUSDC"
		} else {
			yUSDCData['balanceFulcrumAvailable'] = result
		}
	})

	await yUSDC.methods.balanceFulcrumInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumInToken : yUSDC"
		} else {
			yUSDCData['balanceFulcrumInToken'] = result
		}
	})

	await yUSDC.methods.balanceFulcrum().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrum : yUSDC"
		} else {
			yUSDCData['balanceFulcrum'] = result
		}
	})

	return yUSDCData
}

module.exports = getUSDCData