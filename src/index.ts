import { config } from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnections } from "typeorm";
import express = require("express");
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
config({ path: ".env" });

(async () => {
  const app = express();
  await createConnections();
  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
  });
  app.get("/", (req, res) => {
    res.end(
      `<a href="http://localhost:${process.env.PORT}${server.graphqlPath}" title="Go to GraphQL" >GraphQL</a>`
    );
  });
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.warn(`http://localhost:${process.env.PORT}`);
  });
})();
