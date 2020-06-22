const mongoose = require(`mongoose`);

const portfolioSchema = new mongoose.Schema({
    // contains an array of objects.
    // the string represents the stock ticker, for api requests
    // the number is the number of shares owned in that stock
    conservative: [ {ticker: String, shares: Number, price: Number} ],
    moderate: [ {ticker: String, shares: Number, price: Number} ],
    aggressive: [ {ticker: String, shares: Number, price: Number} ],
    conservativePercent: { type: Number },
    moderatePercent: { type: Number },
    aggressivePercent: { type: Number },
    portfolioType: { type: String },
    investmentAmount: { type: Number }
});

const Portfolio = mongoose.model(`Portfolio`, portfolioSchema);

module.exports = Portfolio;