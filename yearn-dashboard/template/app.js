// var daiData = {};
// var usdcData = {};
// var usdtData = {};
// var busdData = {};

new Vue({
	el: "#head",
	data: {
		titl: "Yearn.Finance Dashboard",
		yTokenTab: [true, false, false, false],
	},
	methods: {
		setPage: function (index) {
			this.yTokenTab = [false, false, false, false]
			this.yTokenTab[index] = true
		}
	}
})

new Vue({
	el: "#app",
	data: {
		yTokenTab: [true, false, false, false],
		busdData: null,
		usdcData: null,
		usdtData: null,
		daiData: null,
		xbusdData : {
			"name": "busd",
			"getPricePerFullShare": "1029159258684261508",
			"calcPoolValueInToken": "36920752268619293050823070",
			"totalSupply": "35874673387111127673871567",
			"balanceDydxAvailable": "0",
			"balanceDydx": "0",
			"balanceAaveAvailable": "6981372945869899378364296",
			"balanceAave": "25295842218837141370388952",
			"balanceCompound": "0",
			"balanceCompoundInToken": "0",
			"balanceFulcrumAvailable": "0",
			"balanceFulcrumInToken": "0",
			"balanceFulcrum": "0"
		},
		xusdtData : {
			"name": "usdt",
			"getPricePerFullShare": "1050192403329499290",
			"calcPoolValueInToken": "53262121070439",
			"totalSupply": "50716536228579",
			"balanceDydxAvailable": "0",
			"balanceDydx": "0",
			"balanceAaveAvailable": "7078683647189",
			"balanceAave": "43544720023200",
			"balanceCompound": "0",
			"balanceCompoundInToken": "0",
			"balanceFulcrumAvailable": "0",
			"balanceFulcrumInToken": "0",
			"balanceFulcrum": "0"
		},
		xdaiData : {
			"name": "dai",
			"getPricePerFullShare": "1066154214083415794",
			"calcPoolValueInToken": "32715790855676102618642299",
			"totalSupply": "30685796129223405708628616",
			"balanceDydxAvailable": "997906488233794743879433",
			"balanceAaveAvailable": "26746498470356841497685675",
			"balanceAave": "30883982755767486735526089",
			"balanceCompound": "0",
			"balanceCompoundInToken": "0",
			"balanceFulcrumAvailable": "20887269876071093142797",
			"balanceFulcrumInToken": "0",
			"balanceFulcrum": "0"
		},
		xusdcData : {
			"name": "usdc",
			"getPricePerFullShare": "1045113363397229859",
			"calcPoolValueInToken": "31728100723930",
			"totalSupply": "30358525529513",
			"balanceDydxAvailable": "1245973330990",
			"balanceDydx": "0",
			"balanceAaveAvailable": "4414094994204",
			"balanceAave": "30159227400576",
			"balanceCompound": "4760",
			"balanceCompoundInToken": "1",
			"balanceFulcrumAvailable": "4073607854",
			"balanceFulcrumInToken": "0",
			"balanceFulcrum": "0"
		}
	},
	methods: {
		setPage: function (index) {
			this.yTokenTab = [false, false, false, false]
			this.yTokenTab[index] = true
		},
		setData: function () {
			fetch("http://localhost:8000/getDAIInfo").then(res => {
				return res.json()
			}).then(data => {
				this.daiData = data
			})
			fetch("http://localhost:8000/getUSDCInfo").then(res => {
				return res.json()
			}).then(data => {
				this.usdcData = data
			})
			fetch("http://localhost:8000/getUSDTInfo").then(res => {
				return res.json()
			}).then(data => {
				this.usdtData = data
			})
			fetch("http://localhost:8000/getBUSDInfo").then(res => {
				return res.json()
			}).then(data => {
				this.busdData = data
			})
			console.log("done");
		},
		dumb: function() {
			this.daiData = this.xdaiData;
			this.usdcData = this.xusdcData
			this.usdtData = this.xusdtData
			this.busdData = this.xbusdData
		}
	},
})