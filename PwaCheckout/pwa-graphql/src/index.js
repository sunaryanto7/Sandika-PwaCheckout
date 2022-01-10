const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const { mergeSchemas } = require('@graphql-tools/schema');
const AuthSchema = require('./authorization');
const SwiftSchema = require('./swift-pwa');

const executor = async () => {
  const AUTH_SCHEMA = AuthSchema;
  const SWIFT_SCHEMA = await SwiftSchema();

  const schemas = mergeSchemas({
    schemas: [AUTH_SCHEMA, SWIFT_SCHEMA]
  });

  return schemas;
};

module.exports = executor;