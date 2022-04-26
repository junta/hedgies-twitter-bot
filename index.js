// import cron from "node-cron";
// import { lastEvent } from "event";
var cron = require('node-cron');
const sale = require('./newSales');
const list = require('./newListings');
const stats = require('./requestStats');

// cron.schedule("* * * * *", async () => {
//   console.log("cron start");
//   await event.lastEvent();
// });

// cron.schedule("*/5 * * * * *", async () => {
// list.newListings();
// sale.newSales();
// });
stats.request();
