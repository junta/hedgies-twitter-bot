const axios = require('axios');
const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
require('dotenv').config();
const requestStats = require('./requestStats');

async function tweetStats() {
	const stats = await requestStats.request();

	// format tweet text
	const floor_price = _.get(stats, 'floor_price');

	const tweetText = `📈 Daily Stats \n Floor Price: ${floor_price} ETH `;

	return tweet.tweet(tweetText);
}

module.exports = {
	tweetStats
};
