const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const { ethers } = require('ethers');
const tweet = require('./tweet');
require('dotenv').config();
const { API_URL } = require('./constants');

async function request(event_type) {
	// const lastTime = moment().startOf("minute").subtract(59, "seconds").unix();
	// const lastTime = moment().startOf("minute").subtract(37, "hours").unix();
	const lastTime = moment().startOf('minute').subtract(2, 'hours').unix();
	let response;

	try {
		response = await axios.get(API_URL + 'events', {
			headers: {
				'X-API-KEY': process.env.X_API_KEY
			},
			params: {
				collection_slug: 'hedgies',
				event_type: event_type,
				occurred_after: lastTime,
				only_opensea: 'false'
			}
		});
	} catch {
		console.error(error);
	}

	const events = _.get(response, ['data', 'asset_events']);

	sortedEvents = _.sortBy(events, function (event) {
		const created = _.get(event, 'created_date');

		return new Date(created);
	});

	console.log(`${events.length} events since the last one...`);

	return sortedEvents;
}

module.exports = {
	request
};
