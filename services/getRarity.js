const fs = require('fs');
const { parse } = require('csv-parse/sync');

function getRarity(id) {
	const data = fs.readFileSync('./services/hedgies_rarity.csv');

	const records = parse(data, { columns: true });
	const hedgieRecord = records.filter((record) => record.ID == id);
	console.log(hedgieRecord[0].Rank);

	// for (const record of records) {
	// 	console.log(record);
	// }
}

module.exports = {
	getRarity
};
