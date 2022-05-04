var cron = require('node-cron');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');

cron.schedule('* * * * *', async () => {
	list.newListings();
	sale.newSales();
});

cron.schedule('0 0 * * *', async () => {
	stats.tweetStats();
});

// list.newListings();
// sale.newSales();
// stats.tweetStats();
