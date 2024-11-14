import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { startStandaloneServer } from "@apollo/server/standalone";
import BooksData from "./booksData.js";

// 定義 GraphQL Schema
const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    author: String!
    year: Int!
    type: String!
  }
  type Query {
    getBooks: [Book!]
  }
`;

// 定義解析器
const resolvers = {
  Query: {
    getBooks: () => {
      return BooksData;
    },
  },
};

// 建立 Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 啟動伺服器
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// 讓伺服器運行
console.log(`🚀  Server ready at: ${url}`);

// node ./src/server/booksServer.js
