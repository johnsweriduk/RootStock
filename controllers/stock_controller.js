const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

const smallPrice = 5;
const moderatePrice = 25;


router.get('/:searchType', (req, res) => {
    const searchType = req.params.searchType;
    const url = 'https://sandbox.iexapis.com/stable/stock/market/list/iexvolume/quote?token=' + process.env.TESTKEY + '&listLimit=100';
    request(url, (err, response, body) => {
        const stocks = [];
        body = JSON.parse(body);
        for(let stock of body) {
            if(stock.latestPrice < 25 && stock.latestPrice > 5) {
                stocks.unshift(stock);
            }
        }
        console.log(stocks.length);
        res.json(body);
    })
});

module.exports = router;
