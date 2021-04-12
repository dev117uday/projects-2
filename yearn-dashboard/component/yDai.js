const fs = require('fs')
require("dotenv").config()
const web3 = require("./web3").web3
const DAI_ADDRESS = process.env.DAI_ADDRESS

let filePath = "./abi/yDaiV3_ABI.json"
let abi = JSON.parse(fs.readFileSync(filePath))
const yDai = new web3.eth.Contract(abi, DAI_ADDRESS)

let yDaiData = {
	name: "dai",
}

async function getDaiData() {
	await yDai.methods.getPricePerFullShare().call(function (err, result) {
		if (err) {
			return "Error in getPricePerFullShare : yDai"
		} else {
			yDaiData['getPricePerFullShare'] = result
		}
	})

	await yDai.methods.calcPoolValueInToken().call(function (err, result) {
		if (err) {
			return "Error in calcPoolValueInToken : yDai"
		} else {
			yDaiData['calcPoolValueInToken'] = result
		}
	})

	await yDai.methods.totalSupply().call(function (err, result) {
		if (err) {
			return "Error in totalSupply : yDai"
		} else {
			yDaiData['totalSupply'] = result
		}
	})


	await yDai.methods.balanceDydxAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceDydxAvailable : yDai"
		} else {
			yDaiData['balanceDydxAvailable'] = result
		}
	})

	// await yDai.methods.balanceDydx().call(function (err, result) {
	// 	if (err) {
	// 		return "Error in balanceDydx : yDai"
	// 	} else {
	// 		yDaiData['balanceDydx'] = result
	// 	}
	// })

	await yDai.methods.balanceAaveAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceAaveAvailable : yDai"
		} else {
			yDaiData['balanceAaveAvailable'] = result
		}
	})

	await yDai.methods.balanceAave().call(function (err, result) {
		if (err) {
			return "Error in balanceAave : yDai"
		} else {
			yDaiData['balanceAave'] = result
		}
	})


	await yDai.methods.balanceCompound().call(function (err, result) {
		if (err) {
			return "Error in balanceCompound : yDai"
		} else {
			yDaiData['balanceCompound'] = result
		}
	})

	await yDai.methods.balanceCompoundInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceCompoundInToken : yDai"
		} else {
			yDaiData['balanceCompoundInToken'] = result
		}
	})

	await yDai.methods.balanceFulcrumAvailable().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumAvailable : yDai"
		} else {
			yDaiData['balanceFulcrumAvailable'] = result
		}
	})

	await yDai.methods.balanceFulcrumInToken().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrumInToken : yDai"
		} else {
			yDaiData['balanceFulcrumInToken'] = result
		}
	})

	await yDai.methods.balanceFulcrum().call(function (err, result) {
		if (err) {
			return "Error in balanceFulcrum : yDai"
		} else {
			yDaiData['balanceFulcrum'] = result
		}
	})
	return yDaiData
}

module.exports = getDaiData