// import cron from "node-cron";
// import { lastEvent } from "event";
var cron = require("node-cron");
const event = require("./event");

// cron.schedule("* * * * *", async () => {
//   console.log("cron start");
//   await event.lastEvent();
// });

// cron.schedule("*/5 * * * * *", async () => {
event.lastEvent();
// });
