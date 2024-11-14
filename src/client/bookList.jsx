import React from "react";
import { useQuery, gql } from "@apollo/client";

// 定義 GraphQL 查詢
const GET_BOOKS = gql`
  query getBooks {
    getBooks {
      id
      name
      author
      # year
      # type
    }
  }
`;

function BookList() {
  // 使用 useQuery 發送查詢請求
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      <h1>BookList</h1>
      <ul>
        {data.getBooks.map((book) => (
          <li key={book.id} style={{ marginBottom: "1rem" }}>
            書名:{book.name}
            <br />
            作者:{book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
