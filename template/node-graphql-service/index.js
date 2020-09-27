// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const { handler, resolvers, typeDefs } = require('./function/handler');
const { ApolloServer } = require('apollo-server');
const app = new ApolloServer({ typeDefs, resolvers });

const init = async () => {
  await handler({ "app": app });
  const port = process.env.http_port || 4000;

  // Start the server
  app.listen(port, () => {
    console.log(`Go to http://localhost:${port}/graphql to run queries!`);
  });
}

init();