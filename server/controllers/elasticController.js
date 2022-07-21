const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const elasticClient = require("../elasticSearch/index");
const logger = require("../logger");

exports.elasticAddIndexHandler = async (request, reply) => {
  const { userId, rating } = request.payload;
  try {
    await elasticClient.index({
      index: "ratings",
      body: {
        userId: userId,
        rating: rating,
      },
    });

    reply(
      successReplyMessage("", "Index created successfully in elastic search.")
    );
    logger.log("info", "Index created successfully!");
  } catch (error) {
    logger.log("error", "Error while creating index in elastic search.");
    reply(catchReplyMessage());
  }
};

exports.elasticSearchIndexHandler = async (request, reply) => {
  try {
    const body = await elasticClient.search({
      index: "ratings",
      body: {
        query: {
          match: { userId: request.params.userId },
        },
      },
    });

    logger.log("info", "Index retrieved successfully in elastic search.");
    reply(
      successReplyMessage(body.hits.hits, "Fetched user's rating successfully!")
    );
  } catch (error) {
    logger.log("error", "Error while retriving index in elastic search.");
    reply(catchReplyMessage());
  }
};
