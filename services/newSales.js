const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
const requestEvents = require('./requestEvents');

async function newSales() {
	const events = await requestEvents.request('successful');

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

		const totalPrice = _.get(event, 'total_price');
		const tokenId = _.get(event, ['asset', 'token_id']);

		const tokenDecimals = _.get(event, ['payment_token', 'decimals']);
		const tokenUsdPrice = _.get(event, ['payment_token', 'usd_price']);
		const tokenEthPrice = _.get(event, ['payment_token', 'eth_price']);

		const formattedUnits = ethers.utils.formatUnits(totalPrice, tokenDecimals);
		const formattedEthPrice = formattedUnits * tokenEthPrice;
		const formattedUsdPrice = formattedUnits * tokenUsdPrice;

		const tweetText = `✅  ${assetName} Sold! \n \n 💰️ Price: ${formattedEthPrice}${
			ethers.constants.EtherSymbol
		} ($${Number(formattedUsdPrice).toFixed(1)})  ${openseaLink}`;

		return tweet.tweet(tweetText);
	});
}

module.exports = {
	newSales
};
