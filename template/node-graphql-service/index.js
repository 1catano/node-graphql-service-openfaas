// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express')
const app = express()
const handler = require('./function/handler');
const { ApolloServer, gql } = require('apollo-server-express');
const books = [
  {
    title: 'JavaScript for Dummies',
    author: 'Jane Smith',
  },
  {
    title: 'JavaScript Book',
    author: 'Michael Smith',
  },
];
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;
const resolvers = {
  Query: {
    books: () => books,
  },
};


async function init() {
    await handler({ "app": app });

    const port = process.env.http_port || 3000;
    app.disable('x-powered-by');

    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });

    // Start the server
    app.listen(port, () => {
        console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
    });
}

init();