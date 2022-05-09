# Hedgies Twitter Bot 🤖

- Twitter bot tweeting new listing, sales and stats of [Hedgies NFT collection](https://opensea.io/collection/hedgies).
- Account: https://twitter.com/HedgiesInfo

## Data Sources

- [OpenSea API](https://docs.opensea.io/reference/api-overview)
- [dYdX API](https://docs.dydx.exchange/)
- [Hedgies rarity score](https://docs.google.com/spreadsheets/d/1k5C3Iek-m83sIzSR0PPu93gF5AmBKTjTIK625-Zaktw/edit#gid=1261121203)

## Requirements 📝

- [Twitter Developer Account](https://developer.twitter.com/en/apply-for-access) (with [Elevated Access](https://developer.twitter.com/en/portal/products/elevated), as we need v1.1 endpoint access)

- A OpenSea API Key (request one [here](https://docs.opensea.io/reference/api-overview))

## Setup 🔧

- Clone/Fork/Copy this project to your local public/private git repo

- Create a Twitter Developer App (make sure you change it to have both read/write permissions)

- Make sure you are logged in to the Twitter account you want the bot to run on (as the next step will be authorizing the bot to post on your account)

- **CONSUMER_KEY** - Your Twitter Developer App's Consumer Key
- **CONSUMER_SECRET** - Your Twitter Developer App's Consumer Secret
- **ACCESS_TOKEN_KEY** - The Access Token Key of the Twitter Account your bot is posting from
- **ACCESS_TOKEN_SECRET** - The Access Token Secret of the Twitter Account your bot is posting from
- **X_API_KEY** - Your unique OpenSea API key

## License 📃

This code is licensed under the [ISC License](https://choosealicense.com/licenses/isc/).

Please include proper attribution to my original repo if you fork, modify or utilize this repo in any way. Thank you!
