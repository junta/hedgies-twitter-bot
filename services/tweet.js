const axios = require('axios');
const twit = require('twit');
const fs = require('fs');
require('dotenv').config();

const twitterConfig = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
};

const twitterClient = new twit(twitterConfig);

// Tweet a text-based status
async function tweet(tweetText) {
	const tweet = {
		status: tweetText
	};

	twitterClient.post('statuses/update', tweet, (error, tweet, response) => {
		if (!error) {
			console.log(`Successfully tweeted: ${tweetText}`);
		} else {
			console.error(error);
		}
	});
}

// OPTIONAL - use this method if you want the tweet to include the full image file of the OpenSea item in the tweet.
async function tweetWithImage(tweetText, tokenId, url) {
	// Format our image to base64
	let processedImage;
	if (tokenId) {
		processedImage = await getBase64Local(tokenId);
	} else {
		processedImage = await getBase64(url);
	}

	// Upload the item's image from OpenSea to Twitter & retrieve a reference to it
	twitterClient.post(
		'media/upload',
		{ media_data: processedImage },
		(error, media, response) => {
			if (!error) {
				const tweet = {
					status: tweetText,
					media_ids: [media.media_id_string]
				};

				twitterClient.post(
					'statuses/update',
					tweet,
					(error, tweet, response) => {
						if (!error) {
							console.log(`Successfully tweeted: ${tweetText}`);
						} else {
							console.error(error);
						}
					}
				);
			} else {
				console.error(error);
			}
		}
	);
}

// convert local image into it's base64 representation
function getBase64Local(tokenId) {
	const filePath = './images/' + tokenId + '.jpg';
	const base64Data = fs.readFileSync(filePath, { encoding: 'base64' });
	// return 'data:image/jpeg;base64,' + base64Data;
	return base64Data;
}

function getBase64(url) {
	return axios
		.get(url, { responseType: 'arraybuffer' })
		.then((response) =>
			Buffer.from(response.data, 'binary').toString('base64')
		);
}

module.exports = {
	tweet: tweet,
	tweetWithImage: tweetWithImage
};
