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

module.exports = router;
