const tweet = require('./services/tweet');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');
const rarity = require('./services/getRarity');

// tweet.tweet('✅  Hedgie Sold! \n \n 🦔');

// stats.tweetStats();
rarity.getRarity('1965');
