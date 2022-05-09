const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
require('dotenv').config();
const { API_URL } = require('./constants');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

async function request(event_type) {
	const db = new JsonDB(new Config('data/hedgiesEvent', true, false, '/'));
	const lastTime = db.getData('/' + event_type);
	console.log(event_type, ' lastTime: ', storedLastTime);

	// const lastTime = moment().startOf('minute').subtract(50, 'hours').unix();
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
	} catch (error) {
		console.error(error);
	}

	if (!response) return;

	const events = _.get(response, ['data', 'asset_events']);

	sortedEvents = _.sortBy(events, function (event) {
		const created = _.get(event, 'created_date');
		return new Date(created);
	});

	_.each(sortedEvents, (event) => {
		const created = _.get(event, 'created_date');
		db.push('/' + event_type, moment(created).unix());
	});

	// console.log(`${events.length} events since the last one...`);

	return sortedEvents;
}

module.exports = {
	request
};
