const axios = require('axios');
const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
require('dotenv').config();
const requestEvents = require('./requestEvents');

async function newListings() {
	const events = await requestEvents.request('created');

	_.each(events, (event) => {
		// format tweet text
		const assetName = _.get(
			event,
			['asset', 'name'],
			_.get(event, ['asset_bundle', 'name'])
		);

		const openseaLink = _.get(
			event,
			['asset', 'permalink'],
			_.get(event, ['asset_bundle', 'permalink'])
		);

		const price = _.get(event, 'starting_price');
		const tokenId = _.get(event, ['asset', 'token_id']);

		const tokenDecimals = _.get(event, ['payment_token', 'decimals']);
		const tokenUsdPrice = _.get(event, ['payment_token', 'usd_price']);
		const tokenEthPrice = _.get(event, ['payment_token', 'eth_price']);

		const formattedUnits = ethers.utils.formatUnits(price, tokenDecimals);
		const formattedEthPrice = formattedUnits * tokenEthPrice;
		const formattedUsdPrice = formattedUnits * tokenUsdPrice;

		const tweetText = `✅  ${assetName} New Listing! \n \n 💰️ Price: ${formattedEthPrice}${
			ethers.constants.EtherSymbol
		} ($${Number(formattedUsdPrice).toFixed(1)})  ${openseaLink}`;

		return tweet.tweet(tweetText);
	});
}

module.exports = {
	newListings
};
