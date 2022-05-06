var cron = require('node-cron');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');
const dailyComp = require('./services/dailyComp');

cron.schedule('* * * * *', async () => {
	list.newListings();
	sale.newSales();
});

cron.schedule('0 0 * * *', async () => {
	stats.tweetStats();
});

cron.schedule('15 30 * * *', async () => {
	dailyComp.tweetDailyComp();
});
