import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const PORT = process.env.PORT || 5000;
  const app = express();
  const DB = await createConnection();
  const graphqlServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
  });

  graphqlServer.applyMiddleware({ app });
  config({ path: ".env" });
  app.get("/", (req, res) => {
    res.end(
      '<a href="http://localhost:5000/graphql" >You can Go to GraphQL Server</a>'
    );
  });
  app.listen(PORT, () => {
    console.log(`http://loclahost/${PORT}`);
  });
})();
