// import cron from "node-cron";
// import { lastEvent } from "event";
var cron = require('node-cron');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');

cron.schedule('* * * * *', async () => {
	list.newListings();
	sale.newSales();
});

cron.schedule('10 15 * * *', async () => {
	stats.tweetStats();
});

// cron.schedule("*/5 * * * * *", async () => {
// list.newListings();
// sale.newSales();
// });
stats.tweetStats();
