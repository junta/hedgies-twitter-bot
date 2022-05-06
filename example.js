const tweet = require('./services/tweet');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');
const rarity = require('./services/getRarity');
const dailyComp = require('./services/dailyComp');
const requestEvents = require('./services/requestEvents');

// tweet.tweet('✅  Hedgie Sold! \n \n 🦔');
// list.newListings();
// stats.tweetStats();
// const result = rarity.getRarity('1965');
// console.log(result.score);
// dailyComp.tweetDailyComp();
requestEvents.request('successful');
