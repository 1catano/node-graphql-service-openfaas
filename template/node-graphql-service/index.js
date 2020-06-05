// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express');
const app = express();
const { handler, shcemaResolvers, typeDefs } = require('./function/handler');
const { ApolloServer } = require('apollo-server-express');

const resolvers = {};
if (shcemaResolvers.query) resolvers['Query'] = shcemaResolvers.query;
if (shcemaResolvers.mutation) resolvers['Mutation'] = shcemaResolvers.mutation;

async function init() {
  await handler({ "app": app });

  const port = process.env.http_port || 3000;
  app.disable('x-powered-by');
  if (Object.keys(resolvers).length) {
    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });
  }
  // Start the server
  app.listen(port, () => {
    console.log(`Go to http://localhost:${port}/graphql to run queries!`);
  });
}

init();