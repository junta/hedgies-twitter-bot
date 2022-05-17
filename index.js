var cron = require('node-cron');
const sale = require('./services/newSales');
const list = require('./services/newListings');
const stats = require('./services/dailyStats');
const dailyComp = require('./services/dailyComp');
require('dotenv').config();
const Sentry = require('@sentry/node');
const SentryTracing = require('@sentry/tracing');
const { CaptureConsole } = require('@sentry/integrations');

Sentry.init({
	dsn: process.env.SENTRY_DNS,
	integrations: [
		new CaptureConsole({
			// array of methods that should be captured
			// defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
			levels: ['error']
		})
	],
	tracesSampleRate: 1.0
});

cron.schedule('* * * * *', async () => {
	list.newListings();
	sale.newSales();
});

cron.schedule('0 0 * * *', async () => {
	stats.tweetStats();
});

cron.schedule('30 15 * * *', async () => {
	dailyComp.tweetDailyComp();
});
