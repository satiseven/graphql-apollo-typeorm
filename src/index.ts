import { config } from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import { createConnections } from "typeorm";
import express = require("express");
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { AddressResolver } from "./resolvers/AddressResolver";

config({ path: ".env" });
// mutation{
//     createAddress(address:"Millet Cd. Feza Apartmanı No: 24 K: 3 D: 9Yusufpaşa",
//     phone:"5338155684",tc:"99638806504",userId:1,title:"İŞ",ilce:345)
//   }
(async () => {
  const app = express();
  await createConnections();
  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver, AddressResolver] }),
  });
  app.get("/", (_, res) => {
    res.end(
      `<a href="http://localhost:${process.env.PORT}${server.graphqlPath}" title="Go to GraphQL" >GraphQL</a>`
    );
  });
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.warn(`http://localhost:${process.env.PORT}`);
  });
})();
