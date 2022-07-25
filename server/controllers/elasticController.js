const { successReplyMessage, catchReplyMessage } = require("../helpers/helper");
const logger = require("../logger");
const { createIndex, searchIndex } = require("../utils/elasticQuery");

exports.elasticAddIndexHandler = async (request, reply) => {
  const { userId, rating } = request.payload;
  try {
    await createIndex({
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
    const body = await searchIndex({
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
