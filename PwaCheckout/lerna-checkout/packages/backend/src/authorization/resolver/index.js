const internalGenerateSession = require('./internalGenerateSession');
const internalDeleteSession = require('./internalDeleteSession');

const resolver = {
  Mutation: {
    internalGenerateSession,
    internalDeleteSession,
  },
};

module.exports = resolver;