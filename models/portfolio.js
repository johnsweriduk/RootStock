const mongoose = require(`mongoose`);

const portfolioSchema = new mongoose.Schema({
    // contains an array of objects.
    // the string represents the stock ticker, for api requests
    // the number is the number of shares owned in that stock
    conservative: [ {ticker: String, shares: Number} ],
    moderate: [ {ticker: String, shares: Number} ],
    aggressive: [ {ticker: String, shares: Number} ],
    conservativePercent: { type: Number },
    moderatePercent: { type: Number },
    aggressivePercent: { type: Number },
    portfolioType: { type: String }
});

const Portfolio = mongoose.model(`Portfolio`, portfolioSchema);

module.exports = Portfolio;