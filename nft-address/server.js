const express = require('express')
const app = express()
const port = 3000
const getAddressDict = require("./scripts/interact").getAddressDict

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/getaddress/:uniqueKey', async (req, res) => {
	let data = req.params['uniqueKey'];
	let result = await getAddressDict(data)
	res.send(result)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})