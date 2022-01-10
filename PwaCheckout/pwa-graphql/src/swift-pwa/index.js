const fetch = require('cross-fetch');
const { print } = require('graphql');
const { wrapSchema, introspectSchema } = require('@graphql-tools/wrap');

const executor = async ({ document, variables, context }) => {
  try {
    let token = "";
    if (context) {
      const { req } = context;
      token = req.session.token ? `Bearer ${req.session.token}` : req.headers.authorization ? `${req.headers.authorization}` : "";
    }

    const query = print(document);

    const fetchResult = await fetch("https://swiftpwa-be.testingnow.me/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ query, variables }),
    });

    const response = await fetchResult.json();
    if (response.errors) {
      throw response.errors[0];
    }
    return response
  }
  catch (err) {
    return {
      errors: [
        {
          message: err.extensions.category,
          extensions: err,
        },
      ],
      data: err.data,
    };
  }

};

module.exports = async () => {
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });

  return schema;
};