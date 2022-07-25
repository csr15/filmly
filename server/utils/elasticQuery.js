const elasticClient = require("../elasticSearch/index");

exports.createIndex = async (props) => {
  const data = await elasticClient.index(props);

  return data;
};

exports.searchIndex = async (props) => {
  const data = await elasticClient.search(props);

  return data;
};
