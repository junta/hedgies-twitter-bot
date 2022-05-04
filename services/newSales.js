const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
const requestEvents = require('./requestEvents');
const rarity = require('./getRarity');

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

		const { rank, score } = rarity.getRarity(tokenId);

		const tweetText = `Sold 🔥 ${assetName} \n
		💰️ Price: ${formattedEthPrice} ETH ($${Number(formattedUsdPrice).toFixed(1)}) 
		💎 Rarity Score: ${score}
		👑 Rarity Rank: #${rank} 
		${openseaLink}`;

		// return tweet.tweet(tweetText);
		return tweet.tweetWithImage(
			tweetText,
			'https://i.postimg.cc/qv2nb4SS/Banner-Props.png'
		);
	});
}

module.exports = {
	newSales
};
