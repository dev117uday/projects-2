const fs = require('fs')
require("dotenv").config()
const web3 = require("./web3").web3
const USDT_ADDRESS = process.env.USDT_ADDRESS

let filePath = "./abi/yUSDTV3_ABI.json"
let abi = JSON.parse(fs.readFileSync(filePath))
const yUSDT = new web3.eth.Contract(abi, USDT_ADDRESS)

let yUSDTData = {
	name: "usdt",
}

async function getUSDTData() {
	await yUSDT.methods.getPricePerFullShare().call(function (err, result) {
		if (err) {
			return "Error in getPricePerFullShare : yUSDT"
		} else {
			yUSDTData['getPricePerFullShare'] = result
		}
	})

	await yUSDT.methods.calcPoolValueInToken().call(function (err, result) {
		if (err) {
			return "Error in calcPoolValueInToken : yUSDT"
		} else {
			yUSDTData['calcPoolValueInToken'] = result
		}
	})

	await yUSDT.methods.totalSupply().call(function (err, result) {
		if (err) {
			return "Error in totalSupply : yUSDT"
		} else {
			yUSDTData['totalSupply'] = result
		}
	})


	await yUSDT.methods.balanceDydxAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceDydxAvailable : yUSDT"
		} else {
			yUSDTData['balanceDydxAvailable'] = result
		}
	})

	await yUSDT.methods.balanceDydx().call(function (err, result) {
		if (err) {
			return "Error in balanceDydx : yUSDT"
		} else {
			yUSDTData['balanceDydx'] = result
		}
	})

	await yUSDT.methods.balanceAaveAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceAaveAvailable : yUSDT"
		} else {
			yUSDTData['balanceAaveAvailable'] = result
		}
	})

	await yUSDT.methods.balanceAave().call(function (err, result) {
		if (err) {
			return "Error in balanceAave : yUSDT"
		} else {
			yUSDTData['balanceAave'] = result
		}
	})


	await yUSDT.methods.balanceCompound().call(function (err, result) {
		if (err) {
			return "Error in balanceCompound : yUSDT"
		} else {
			yUSDTData['balanceCompound'] = result
		}
	})

	await yUSDT.methods.balanceCompoundInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceCompoundInToken : yUSDT"
		} else {
			yUSDTData['balanceCompoundInToken'] = result
		}
	})

	await yUSDT.methods.balanceFulcrumAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumAvailable : yUSDT"
		} else {
			yUSDTData['balanceFulcrumAvailable'] = result
		}
	})

	await yUSDT.methods.balanceFulcrumInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumInToken : yUSDT"
		} else {
			yUSDTData['balanceFulcrumInToken'] = result
		}
	})

	await yUSDT.methods.balanceFulcrum().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrum : yUSDT"
		} else {
			yUSDTData['balanceFulcrum'] = result
		}
	})
	return yUSDTData
}

module.exports = getUSDTData