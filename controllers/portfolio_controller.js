const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio.js');

router.post('/', (req, res) => {
    Portfolio.create(req.body, (err, createdPortfolio) => {
        res.json(createdPortfolio);
    });
});

router.delete('/:id', (req, res) => {
    Portfolio.findByIdAndRemove(req.params.id, (err, deletedPortfolio) => {
        res.json(deletedPortfolio);
    });
});

router.put('/:id', (req, res) => {
    Portfolio.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedPortfolio) => {
            res.json(updatedPortfolio);
        }
    );
});

router.put('/:id/:searchType', (req, res) => {
    const searchType = req.params.searchType;
    Portfolio.findOne(
        {_id: req.params.id},
        (err, foundPortfolio) => {
            foundPortfolio[searchType] = [];
            for(let stock of req.body) {
                foundPortfolio[searchType].unshift(stock);
            }
            console.log(searchType);
            console.log(foundPortfolio[searchType]);
            foundPortfolio.save();
            res.json(foundPortfolio);
        }
    );
});

router.get('/', (req, res) => {
    Portfolio.find({}, (err, foundPortfolio) => {
        res.json(foundPortfolio);
    });
});

router.get('/:id', (req, res) => {
   Portfolio.find({_id: req.params.id}, (err, foundPortfolio) => {
       res.json(foundPortfolio);
   });
});

router.post('/modify/:id', (req, res) => {
    // console.log(req.params.id);

    console.log(req.params);
    console.log(req.body);

    // console.log(req.body.investmentAmount);
    Portfolio.update({
        _id: req.params.id}, 
        {investmentAmount: req.body.investmentAmount}, (error, updatedPortfolio) => {
            console.log(updatedPortfolio);
            res.json(updatedPortfolio);
        
    })
})

router.post('/resetMarketCap/:id', (req, res) => {
    // console.log(req.params.id);

    console.log(req.params);
    console.log(req.body);
    const marketCap = req.body.marketCap;
    // console.log(req.body.investmentAmount);
    Portfolio.update({
        _id: req.params.id}, 
        { marketCap: [] }, (error, updatedPortfolio) => {
            console.log(updatedPortfolio);
            res.json(updatedPortfolio);
        
    })
})

router.post('/resetPortfolio/:id', (req, res) => {
    console.log(req.params._id);
    Portfolio.update({
        _id: req.params.id}, 
        { 
          conservativePercent: 0, 
          moderatePercent: 0,
          aggressivePercent: 0,
          portfolioType: 'None'
        },  (error, updatedPortfolio) => {
            console.log(updatedPortfolio);
            res.json(updatedPortfolio);
        
    })
})


// conservativePercent: { type: Number },
// moderatePercent: { type: Number },
// aggressivePercent: { type: Number },
// portfolioType: { type: String },
// investmentAmount: { type: Number }





module.exports = router;
