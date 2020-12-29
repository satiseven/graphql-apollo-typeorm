import { Users } from "./components/Users";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import { AddUser } from "./components/AddUser";
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Users />
        <AddUser />
      </div>
    </ApolloProvider>
  );
}

export default App;
