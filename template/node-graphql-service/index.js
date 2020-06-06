// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express');
const app = express();
const { handler, resolvers, typeDefs } = require('./function/handler');
const { ApolloServer } = require('apollo-server-express');

async function init() {
  await handler({ "app": app });

  const port = process.env.http_port || 3000;
  app.disable('x-powered-by');

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // Start the server
  app.listen(port, () => {
    console.log(`Go to http://localhost:${port}/graphql to run queries!`);
  });
}

init();