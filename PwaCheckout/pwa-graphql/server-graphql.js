const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { loadSchema } = require('@graphql-tools/load');
const { UrlLoader } = require('@graphql-tools/url-loader');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const getSchema = require('./src');
require('dotenv').config()

const startGraphqlServer = async () => {
  const swiftSchema = await getSchema();
  const whiteListDomains = ['http://localhost:5000', 'http://localhost:3000', "https://studio.apollographql.com", "http://swift.local.com"];

  const corsOptions = {
    origin: whiteListDomains,
    credentials: true,
  }

  const app = express();
  app.use(cors(corsOptions))


  /**
   * ---------------------
   * SESSION CONFIGURATION
   * ---------------------
   */
  app.use(
    cookieSession({
      name: 'session',
      keys: [process.env.SESSION_SECRET],
      maxAge: new Date(Date.now() + 1000 * 60 * 60),
      path: '/',
      cookies: {
        secure: true,
        httpOnly: true,
      },
    }),
  );


  /**
   * ---------------------
   * COOKIE PARSER 
   * CONFIGURATION
   * ---------------------
   */
  app.use(cookieParser())


  /**
   * ---------------------
   * APOLLO SERVER
   * CONFIGURATION
   * ---------------------
   */
  const server = new ApolloServer({
    schema: swiftSchema,
    context: ({ req }) => ({ req }),
  });

  await server.start()
  server.applyMiddleware({
    app: app,
    cors: false,
  })


  /**
   * ---------------------
   * RUN SERVER
   * ---------------------
   */
  app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000/graphql`)
  );
}


startGraphqlServer();
