import { gql, useMutation } from "@apollo/client";
import React from "react";
const ADD_USER = gql`
  mutation createUser(
    $name: String!
    $smsActivated: Boolean!
    $emailActivated: Boolean!
    $role: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      name: $name
      smsActivated: $smsActivated
      emailActivated: $emailActivated
      role: $role
      password: $password
      email: $email
    ) {
      name
      smsActivated
      emailActivated
      role
      password
      email
    }
  }
`;

export const AddUser = () => {
  const [createUser, { data }] = useMutation(ADD_USER);
  const [name, setName] = React.useState("Ferec");
  const [role, setRole] = React.useState("COSTUMER");
  const [smsActivated, setSmsActivated] = React.useState(false);
  const [emailActivated, setEmailActivated] = React.useState(false);
  const [password, setPassword] = React.useState("faezeh7&7");
  const [email, setEmail] = React.useState("SERVICE@gmail.com");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser({
            variables: {
              name,
              role,
              smsActivated,
              emailActivated,
              password,
              email,
            },
          });
        }}
      >
        <button type="submit">Kullanici Ekle</button>
      </form>
    </div>
  );
};
