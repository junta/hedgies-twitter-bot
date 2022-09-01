const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
const requestEvents = require('./requestEvents');
const rarity = require('./getRarity');

async function newListings() {
	const events = await requestEvents.request('created');

	if (!events) return;

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

		if (!price || !tokenDecimals || !tokenUsdPrice || !tokenEthPrice) return;

		const formattedUnits = ethers.utils.formatUnits(price, tokenDecimals);
		const formattedEthPrice = formattedUnits * tokenEthPrice;
		const formattedUsdPrice = formattedUnits * tokenUsdPrice;

		const { rank, score } = rarity.getRarity(tokenId);

		const tweetText = `New Listing ✅  ${assetName} \n
		💰️ Price: ${formattedEthPrice} ETH ($${Number(formattedUsdPrice).toFixed(1)}) 
		💎 Rarity Score: ${score}
		👑 Rarity Rank: #${rank} 
		${openseaLink}`;

		// return tweet.tweet(tweetText);
		// TODO: temporary blocking
		if (tokenId == '178' || tokenId == '3233') {
			return;
		} else {
			return tweet.tweetWithImage(tweetText, tokenId, null);
		}
	});
}

module.exports = {
	newListings
};
