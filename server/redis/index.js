const redis = require("redis");
const logger = require("../logger");

//Redis Client
let client;
(async () => {
  try {
    client = redis.createClient();
    await client.connect();

    console.log("Redis connected successfully.");
    logger.log("info", "Redis connected successfully.");
  } catch (error) {
    console.log("Error while connecting to Redis.");
    logger.log("error", "Error on connecting redis.");
  }
})();

module.exports = client;
