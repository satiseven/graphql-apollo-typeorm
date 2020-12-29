import React from "react";
import { gql, useQuery } from "@apollo/client";

const getUsers = gql`
  {
    getUsers {
      id
      name
      email
      password
    }
  }
`;
export const Users = (props) => {
  //   React.useEffect(() => {
  //     console.log("jjj");
  //   });
  const { loading, error, data } = useQuery(getUsers);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.getUsers.map((item, key) => {
    return <h2 key={item.id}>{item.name}</h2>;
  });
};
