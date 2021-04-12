const request = require("request-promise");
const cheerio = require("cheerio");

async function barcodeAPI (request,response) {

    let barcode = request.query.value
    let data = [];

    const fromGoogle = await request({
        uri: `https://www.google.co.in/search?q=${barcode}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
            'accept-language': "en-GB,en-US;q=0.9,en;q=0.8"
        },
    })

    let $ = cheerio.load(fromGoogle)
    $('h3[class="LC20lb DKV0Md"]').map((i, elem) => {
        data.push($(elem).text())
    })

    response.send({result:data})

}

module.exports = { barcodeAPI };