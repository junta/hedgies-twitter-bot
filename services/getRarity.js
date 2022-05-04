const fs = require('fs');
const { parse } = require('csv-parse/sync');

function getRarity(id) {
	const data = fs.readFileSync('./services/hedgies_rarity.csv');
	const records = parse(data, { columns: true });
	const hedgieRecord = records.filter((record) => record.ID == id);
	return {
		rank: hedgieRecord[0].Rank,
		score: Number(hedgieRecord[0].Total).toFixed(1)
	};
}

module.exports = {
	getRarity
};
