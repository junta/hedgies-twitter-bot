const _ = require('lodash');
const { ethers } = require('ethers');
const tweet = require('./tweet');
const requestEvents = require('./requestEvents');
const rarity = require('./getRarity');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

async function newListings() {
	const events = await requestEvents.request('created');

	if (!events) return;

	const db = new JsonDB(new Config('data/hedgiesEvent', true, false, '/'));

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

		let tokenLastPrice;
		try {
			tokenLastPrice = db.getData('/listing/' + tokenId + '/lastPrice');
			console.log('token ID: ' + tokenId + ' price: ' + tokenLastPrice);
		} catch {
			console.log('no tokenLastPrice data of token ID: ' + tokenId);
		}

		if (tokenLastPrice && tokenLastPrice == price) {
			console.log('listing with same price');
			return;
		}

		db.push('/listing/' + tokenId + '/lastPrice', price);

		const created = _.get(event, 'created_date');
		db.push('/listing/' + tokenId + '/createdDate', created);

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
		return tweet.tweetWithImage(tweetText, tokenId, null);
	});
}

module.exports = {
	newListings
};
