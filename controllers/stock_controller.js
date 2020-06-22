const http = require('http');
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/:searchType', (req, res) => {
    const searchType = req.params.searchType;
    const url = 'https://sandbox.iexapis.com/stable/stock/market/list/iexvolume/quote?token=' + process.env.TESTKEY + '&listLimit=300';
    request(url, (err, response, body) => {
        const stocks = [];
        body = JSON.parse(body);
        for(let stock of body) {
            let searchFilter;
            if(searchType == 'conservative') {
                searchFilter = stock.latestPrice > 25;
            } else if(searchType === 'moderate') {
                searchFilter = stock.latestPrice < 25 && stock.latestPrice > 5;
            } else {
                searchFilter = stock.latestPrice < 5;
            }
            if(searchFilter) {
                if(stock.companyName != '' && stock.symbol != '' && stock.latestPrice != '' && stock.marketCap != '' && stock.latestUpdate != '') {
                    let exists = false;
                    for(let addedStock of stocks) {
                        const stockName = stock.companyName.substring(0,15);
                        const addedStockName = addedStock.companyName.substring(0,15);
                        if(stockName == addedStockName) {
                            exists = true;
                        }
                    }
                    if(!exists && stocks.length < 20) {
                        stocks.unshift(stock);
                    }
                }
            }
        }
        console.log(stocks.length);
        res.json(stocks);
    })
});

module.exports = router;
