const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();
const { DYDX_API_URL } = require('./constants');

async function request() {
	let response;

	try {
		response = await axios.get(
			DYDX_API_URL + 'hedgies/current?nftRevealType=daily',
			{}
		);
	} catch {
		console.error(error);
	}

	const data = _.get(response, ['data', 'daily']);
	console.log(data);

	return data;
}

module.exports = {
	request
};
