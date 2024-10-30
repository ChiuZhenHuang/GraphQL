import { ApolloServer, gql } from "apollo-server";
import axios from "axios";

// 定義 GraphQL Schema
// 上方為res 下方為req
const typeDefs = gql`
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

  type Query {
    getRDGList(
      Formno: String
      status: String
      type: String!
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
          args // 將 GraphQL 查詢參數直接作為請求主體
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
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
