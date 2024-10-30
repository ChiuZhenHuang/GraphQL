import React from "react";
import { useQuery, gql } from "@apollo/client";

// 定義 GraphQL 查詢
const GET_RDG_LIST = gql`
  query getRDGList(
    $Formno: String
    $status: String
    $type: String
    $Coid: String
    $DeptId: String
    $Startdt: String
    $Enddt: String
    $Createid: String
  ) {
    getRDGList(
      Formno: $Formno
      status: $status
      type: $type
      Coid: $Coid
      DeptId: $DeptId
      Startdt: $Startdt
      Enddt: $Enddt
      Createid: $Createid
    ) {
      RDGId
      status
      CreateName
      CreateDate
      # AppReason
      # SoftwareType
      # Version
      # SVN
      # NextSignName
    }
  }
`;

function List() {
  // 使用 useQuery 發送查詢請求
  const { loading, error, data } = useQuery(GET_RDG_LIST, {
    variables: {
      Formno: "",
      status: "",
      type: "0",
      Coid: "",
      DeptId: "",
      Startdt: "",
      Enddt: "",
      Createid: "",
    },
  });

  // 加載狀態
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      <h1>RDG List</h1>
      <ul>
        {data.getRDGList.map((rdg) => (
          <li key={rdg.RDGId}>
            {rdg.RDGId} - {rdg.status} - {rdg.CreateDate} - 建表人:
            {rdg.CreateName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
