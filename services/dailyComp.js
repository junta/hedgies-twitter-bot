const _ = require('lodash');
const tweet = require('./tweet');
const requestDailyComp = require('./requestDailyComp');
rarity = require('./getRarity');
const { HEDGIE_URL, HEDGIE_IMAGE_URL } = require('./constants');

async function tweetDailyComp() {
	const dailyComp = await requestDailyComp.request();
	if (!dailyComp) return;

	const tokenId = _.get(dailyComp, 'tokenIds')[0];
	const period = _.get(dailyComp, 'competitionPeriod');

	const { rank, score } = rarity.getRarity(tokenId);
	const url = HEDGIE_URL + tokenId;

	const tweetText = `🏆️ Daily Comp. Hedgie

		🦔 Token ID: #${tokenId}
		🗓️ Competition Period: ${period}
		🔒️ Held by: No winner yet
		💎 Rarity Score: ${score}
		👑 Rarity Rank: #${rank} 
		${url}`;

	const imageUrl = HEDGIE_IMAGE_URL + tokenId + '.png';
	return tweet.tweet(tweetText);
	// return tweet.tweetWithImage(tweetText, null, imageUrl);
}

module.exports = {
	tweetDailyComp
};
