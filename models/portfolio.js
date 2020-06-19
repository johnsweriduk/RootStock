const mongoose = require(`mongoose`);

const portfolioSchema = new mongoose.Schema({
    conservative: [ String ],
    moderate: [ String ],
    aggressive: [ String ],
    conservativePercent: { type: Number },
    moderatePercent: { type: Number },
    aggressivePercent: { type: Number },
    portfolioType: { type: String }
});

const Portfolio = mongoose.model(`Portfolio`, portfolioSchema);

module.exports = Portfolio;