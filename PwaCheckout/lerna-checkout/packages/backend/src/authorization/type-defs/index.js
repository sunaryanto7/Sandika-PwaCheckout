const typeDefs = `
  type internalGenerateSessionOutput {
    result: Boolean
    isLogin: Boolean
    cartId: String
    redirect_path: String
  }

  type internalDeleteSessionOutput {
    result: Boolean
  }
  
  type Mutation {
    internalGenerateSession(state: String!): internalGenerateSessionOutput
    internalDeleteSession: internalDeleteSessionOutput
  }
`;

module.exports = typeDefs;