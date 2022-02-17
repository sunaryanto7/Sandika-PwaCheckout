const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./type-defs');
const resolvers = require('./resolver');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;