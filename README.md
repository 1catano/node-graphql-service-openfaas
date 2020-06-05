OpenFaaS Node.js 12 (LTS) and ApolloGraphQL micro-service template
=============================================

This template provides Node.js 12 (LTS) and full access to [ApolloGraphQL](https://www.apollographql.com/docs/apollo-server/) for building microservices for [OpenFaaS](https://www.openfaas.com), Docker, Knative and Cloud Run.

With this template you can create a new microservice and deploy it to a platform like [OpenFaaS](https://www.openfaas.com) for:

* scale-to-zero
* horizontal scale-out
* metrics & logs
* automated health-checks
* sane Kubernetes defaults like running as a non-root user

## Status of the template

This template is experimental and I would like your feedback through GitHub issues or [OpenFaaS Slack](https://docs.openfaas.com/community).

## Supported platforms

* x86_64 - `node-graphql-service`

## Get started

You can create or scaffold a new microservice using the [OpenFaaS CLI](https://github.com/openfaas/faas-cli).

```
# USERNAME is your Docker Hub account or private Docker registry
$ export USERNAME=1catano

$ faas template pull https://github.com/1catano/node-graphql-service-openfaas
$ faas new --lang node-graphql-service microservice1 --prefix="${USERNAME}"
```

Once you've written your code you can run `faas-cli build` to create a local Docker image, then `faas-cli push` to transfer it to your registry.

You can now deploy it to OpenFaaS, Knative, Google Cloud Run or even use `docker run`.

See also: [Deploy OpenFaaS](https://docs.openfaas.com/deployment/)

## Example usage

### Minimal example with one route

```js
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
```
*handler.js*


### You can test our server by running

```js
{
  books {
    title
    author
  }
}
```

