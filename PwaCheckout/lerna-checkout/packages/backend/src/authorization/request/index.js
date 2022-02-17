const { GraphQLClient } = require('graphql-request');
const { decrypt } = require('../../helper/encryptions');

const requestGraph = (query, variables, context) => {
  const { req } = context;
  var token = '';

  if (req.session.token) {
    token = `Bearer ${req.session.token}`;
  } else {
    token = req.headers.authorization ? `${req.headers.authorization}` : "";
  }

  return new Promise((resolve) => {
    const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    client
      .request(query, variables)
      .then((data) => resolve(data))
      .catch((err) => {
        return resolve(err)
      });
  });
}

module.exports = requestGraph;