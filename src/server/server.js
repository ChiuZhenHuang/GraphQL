// import { ApolloServer, gql } from "apollo-server";

import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";

// 定義 GraphQL Schema
const typeDefs = gql`
  # response欄位
  type RDG {
    RDGId: String!
    status: String!
    CreateDate: String!
    AppReason: String!
    SoftwareType: String!
    Version: String!
    SVN: String!
    CreateName: String!
    NextSignName: String!
  }

  # request欄位
  type Query {
    getRDGList(
      Formno: String
      status: String
      type: String
      Coid: String
      DeptId: String
      Startdt: String
      Enddt: String
      Createid: String
    ): [RDG]
  }
`;

// 定義解析器
const resolvers = {
  Query: {
    getRDGList: async (_, args) => {
      try {
        const response = await axios.post(
          "https://orangeapitest.orange-electronic.com/api/GetRDGList",
          args
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data from REST API");
      }
    },
  },
};

// 建立 Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// 啟動伺服器
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

// 讓伺服器運行
console.log(`🚀  Server ready at: ${url}`);
