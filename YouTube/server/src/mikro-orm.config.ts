import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Posts } from "./entities/Posts";
import path from "path";
import { User } from "./entities/User";
export default {
  type: "postgresql",
  dbName: "youtube",
  entities: [Posts, User],
  debug: !__prod__,
  host: "localhost",
  user: "postgres",
  password: "secret",
  port: 5432,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s/,
  },
} as Parameters<typeof MikroORM.init>[0];
