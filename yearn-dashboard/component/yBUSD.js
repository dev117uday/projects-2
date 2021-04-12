const fs = require('fs')
require("dotenv").config()
const web3 = require("./web3").web3
const BUSD_ADDRESS = process.env.BUSD_ADDRESS

let filePath = "./abi/yBUSDV3_ABI.json"
let abi = JSON.parse(fs.readFileSync(filePath))
const yBUSD = new web3.eth.Contract(abi, BUSD_ADDRESS)

let yBUSDData = {
	name: "busd",
}

async function getBUSDData() {
	await yBUSD.methods.getPricePerFullShare().call(function (err, result) {
		if (err) {
			return "Error in getPricePerFullShare : yBUSD"
		} else {
			yBUSDData['getPricePerFullShare'] = result
		}
	})

	await yBUSD.methods.calcPoolValueInToken().call(function (err, result) {
		if (err) {
			return "Error in calcPoolValueInToken : yBUSD"
		} else {
			yBUSDData['calcPoolValueInToken'] = result
		}
	})

	await yBUSD.methods.totalSupply().call(function (err, result) {
		if (err) {
			return "Error in totalSupply : yBUSD"
		} else {
			yBUSDData['totalSupply'] = result
		}
	})


	await yBUSD.methods.balanceDydxAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceDydxAvailable : yBUSD"
		} else {
			yBUSDData['balanceDydxAvailable'] = result
		}
	})

	await yBUSD.methods.balanceDydx().call(function (err, result) {
		if (err) {
			return "Error in balanceDydx : yBUSD"
		} else {
			yBUSDData['balanceDydx'] = result
		}
	})

	await yBUSD.methods.balanceAaveAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceAaveAvailable : yBUSD"
		} else {
			yBUSDData['balanceAaveAvailable'] = result
		}
	})

	await yBUSD.methods.balanceAave().call(function (err, result) {
		if (err) {
			return "Error in balanceAave : yBUSD"
		} else {
			yBUSDData['balanceAave'] = result
		}
	})


	await yBUSD.methods.balanceCompound().call(function (err, result) {
		if (err) {
			return "Error in balanceCompound : yBUSD"
		} else {
			yBUSDData['balanceCompound'] = result
		}
	})

	await yBUSD.methods.balanceCompoundInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceCompoundInToken : yBUSD"
		} else {
			yBUSDData['balanceCompoundInToken'] = result
		}
	})

	await yBUSD.methods.balanceFulcrumAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumAvailable : yBUSD"
		} else {
			yBUSDData['balanceFulcrumAvailable'] = result
		}
	})

	await yBUSD.methods.balanceFulcrumInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumInToken : yBUSD"
		} else {
			yBUSDData['balanceFulcrumInToken'] = result
		}
	})

	await yBUSD.methods.balanceFulcrum().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrum : yBUSD"
		} else {
			yBUSDData['balanceFulcrum'] = result
		}
	})
	return yBUSDData
}

module.exports = getBUSDData