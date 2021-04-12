const express = require('express')
var app = express()
var cors = require('cors')
app.use(cors())

const getDaiData = require('./component/yDai');
const getUSDCData = require('./component/yUSDC')
const getUSDTData = require('./component/yUSDT')
const getBUSDData = require('./component/yBUSD')

app.get('/getDAIInfo', async (req, res) => {
	let data = await getDaiData()
	res.json(data)
})
app.get('/getUSDCInfo', async (req, res) => {
	let data = await getUSDCData()
	res.json(data)
})
app.get('/getUSDTInfo', async (req, res) => {
	let data = await getUSDTData()
	res.json(data)
})
app.get('/getBUSDInfo', async (req, res) => {
	let data = await getBUSDData()
	res.json(data)
})

app.get("/", function (req, response) {
	response.send("hello")
})

app.listen(8000, function () {
	console.log('Listening to PORT 8000')
})