// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const express = require('express')
const app = express()
const handler = require('./function/handler');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// The GraphQL schema in string form
const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
  `;

// The resolvers
const resolvers = {
    Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


async function init() {
    await handler({ "app": app });

    const port = process.env.http_port || 3000;
    app.disable('x-powered-by');

    // The GraphQL endpoint
    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

    // GraphiQL, a visual editor for queries
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

    // Start the server
    app.listen(port, () => {
        console.log(`Go to http://localhost:${port}/graphiql to run queries!`);
    });
}

init();