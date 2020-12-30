import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { createConnections } from "typeorm";
import express = require("express");
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { AddressResolver } from "./resolvers/AddressResolver";
import cors = require("cors");
import cookieParser = require("cookie-parser");
config({ path: ".env" });
(async () => {
  const app = express();
  app.use(cookieParser());
  cors.apply(app);
  await createConnections();
  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver, AddressResolver] }),
    context: ({ req, res }) => ({ req, res }),
  });

  app.get("/", (_, res) => {
    // res.cookie(
    //   "jid",
    //   sign({ userId: 12, email: "user.email" }, process.env.SECRET_KEY, {
    //     expiresIn: "7d",
    //   }),
    //   {
    //     httpOnly: true,
    //   }
    // );
    res.end(
      `<a href="http://localhost:${process.env.PORT}${server.graphqlPath}" title="Go to GraphQL" >GraphQL</a>`
    );
  });
  server.applyMiddleware({ app });
  app.listen(process.env.PORT, () => {
    console.warn(`http://localhost:${process.env.PORT}`);
  });
})();
