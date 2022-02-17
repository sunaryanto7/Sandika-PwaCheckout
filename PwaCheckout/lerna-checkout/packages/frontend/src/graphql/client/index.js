import { GraphQLClient } from 'graphql-request';

const GQLClient = new GraphQLClient(`http://localhost:5000/graphql`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
});

const GQLClientRequest = async (query, variable = {}) => {
  try {
    const response = await GQLClient.request(query, variable);
    if (!response) {
      throw response;
    }
    return {
      status: "success",
      data: response,
      message: ""
    };

  } catch (e) {
    const { message, extensions } = e.response.errors[0];
    if (message === "graphql-authorization") {
      return window.location.replace(process.env.REACT_APP_BO_ENDPOINT);
    }
    return {
      status: "failed",
      data: null,
      message: extensions.message
    };
  }
}

export { GQLClientRequest };