const _ = require('lodash');
const tweet = require('./tweet');
const requestStats = require('./requestStats');
// const { setTimeout } = require('timers/promises');

async function tweetStats() {
	const stats = await requestStats.request();

	dailystats1(stats);
	// await setTimeout(3000);
	dailystats2(stats);
}

function dailystats1(stats) {
	const floorPrice = _.get(stats, 'floor_price');
	const totalVolume = _.get(stats, 'total_volume');
	const totalVolumeFormatted = totalVolume.toLocaleString(undefined, {
		maximumFractionDigits: 1
	});
	const numOwners = _.get(stats, 'num_owners');
	const numOwnersFormatted = numOwners.toLocaleString();
	const totalSupply = _.get(stats, 'total_supply');
	const totalSupplyFormatted = totalSupply.toLocaleString();

	const marketCap = _.get(stats, 'market_cap');
	const marketCapFormatted = marketCap.toLocaleString(undefined, {
		maximumFractionDigits: 1
	});

	const tweetText = `📈 Daily Stats 1 \n
	Floor Price: ${floorPrice} ETH 
	Total Volume: ${totalVolumeFormatted} ETH 
	Hegie Owners: ${numOwnersFormatted} addresses
	Total Supply: ${totalSupplyFormatted} hedgies
	Market Cap: ${marketCapFormatted} ETH
	`;

	return tweet.tweet(tweetText);
}

function dailystats2(stats) {
	const price = _.get(stats, 'one_day_average_price');
	const volume = _.get(stats, 'one_day_volume');
	const VolumeFormatted = volume.toLocaleString(undefined, {
		maximumFractionDigits: 1
	});
	const sevenDaysPrice = _.get(stats, 'seven_day_average_price');
	const sevenDaysVolume = _.get(stats, 'seven_day_volume');
	const sevenDaysVolumeFormatted = sevenDaysVolume.toLocaleString(undefined, {
		maximumFractionDigits: 1
	});
	const thirtyDaysPrice = _.get(stats, 'thirty_day_average_price');
	const thirtyDaysVolume = _.get(stats, 'thirty_day_volume');
	const thirtyDaysVolumeFormatted = thirtyDaysVolume.toLocaleString(undefined, {
		maximumFractionDigits: 1
	});

	const tweetText = `📈 Daily Stats 2 \n
	Daily Avg. Price: ${price} ETH 
	Daily Volume: ${VolumeFormatted} ETH 
	7 Day Avg. Price: ${sevenDaysPrice.toFixed(2)} ETH
	7 Day Volume:  ${sevenDaysVolumeFormatted} ETH
	30 Day Avg. Price:  ${thirtyDaysPrice} ETH
	30 Day Volume: ${thirtyDaysVolumeFormatted} ETH
	`;

	return tweet.tweet(tweetText);
}

module.exports = {
	tweetStats
};
