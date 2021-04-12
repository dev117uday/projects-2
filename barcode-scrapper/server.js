const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const apiBarcode = require("./api/barcode")

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get( "/api/barcode", apiBarcode.barcodeAPI )

app.listen(port, () => {
  console.log(`Listening : http://localhost:${port}`)
})


