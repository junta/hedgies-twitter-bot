const _ = require('lodash');
const tweet = require('./tweet');
const requestDailyComp = require('./requestDailyComp');
rarity = require('./getRarity');
const { HEDGIE_URL } = require('./constants');

async function tweetDailyComp() {
	const dailyComp = await requestDailyComp.request();
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

	return tweet.tweet(tweetText);
}

module.exports = {
	tweetDailyComp
};
