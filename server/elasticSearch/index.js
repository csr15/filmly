const { Client } = require("@elastic/elasticsearch");
const { elastic } = require("../config/config.json");

const client = new Client({
  cloud: {
    id: elastic.cloudID,
  },
  auth: {
    username: elastic.username,
    password: elastic.password,
  },
});

module.exports = client;
