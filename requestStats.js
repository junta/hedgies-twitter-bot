const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");
const { ethers } = require("ethers");
const tweet = require("./tweet");
require("dotenv").config();
const { API_URL } = require("./constants");

async function request() {
  let response;

  try {
    response = await axios.get(API_URL + "collection/hedgies/stats", {
      headers: {
        "X-API-KEY": process.env.X_API_KEY,
      },
    });
  } catch {
    console.error(error);
  }

  const stats = _.get(response, ["data", "stats"]);
  console.log(stats);

  return stats;
}

module.exports = {
  request,
};
