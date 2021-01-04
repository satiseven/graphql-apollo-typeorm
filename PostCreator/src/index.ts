import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { ContextResponse } from "./@types/ContextResponse";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import Redis from "ioredis";
import session from "express-session";
import { environment } from "./configuration/environment";
let RedisStore = require("connect-redis")(session);
(async () => {
  const PORT = process.env.PORT || 5000;
  const redis = new Redis();
  const app = express();
  const accessLogStream = createStream(environment.requestLogFile, {
    interval: environment.requestLogRollingInterval,
    path: environment.logDir,
  });
  const consoleAppender = morgan(environment.requestLogFormat);
  const fileAppender = morgan(environment.requestLogFormat, {
    stream: accessLogStream,
  });
  app.use(consoleAppender);

  const DB = await createConnection();
  const graphqlServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver, PostResolver] }),
    context: ({ req, res }): ContextResponse => ({ req, res }),
  });

  app.use(
    session({
      secret: "thisisasecretkey",
      store: new RedisStore({ client: redis }),
      name: "firstone",
      resave: false,
      cookie: {
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  graphqlServer.applyMiddleware({ app });
  config({ path: ".env" });
  app.get("/", (req, res) => {
    res.end(
      '<a href="http://localhost:5000/graphql" >You can Go to GraphQL Server</a>'
    );
  });
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
})();
