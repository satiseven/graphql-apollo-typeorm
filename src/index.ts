import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
import { __prod__ } from "./constants";
import { Posts } from "./entities/Posts";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { helloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/PostResolver";
import { UserResolver } from "./resolvers/UserResolver";
import connectRedis from "connect-redis";
import redis from "redis";
import session from "express-session";

config({ path: ".env" });

(async () => {
  const orm = await MikroORM.init(mikroConfig);
  const PORT = process.env.PORT || 5000;
  const app = express();
  const redisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      name: "qid",
      store: new redisStore({ client: redisClient }),
      secret: "keyboard cat",
      resave: false,
    })
  );
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
  app.get("/", (_, res) => {
    res.end("<a href='http://localhost:5000/graphql' >graphql </a>");
  });
  server.applyMiddleware({ app });
  //   const post = orm.em.create(Posts, { title: "First One" });
  //   await orm.em.persistAndFlush(post);
})();
