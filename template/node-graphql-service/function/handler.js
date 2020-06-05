"use strict"

const { gql } = require('apollo-server-express');
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

const shcemaResolvers = {
    query: () => books
};

module.exports = {
    handler: async (config) => {
        const app = config.app;
    },
    typeDefs,
    shcemaResolvers
}
