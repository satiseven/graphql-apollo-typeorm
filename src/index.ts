import { MikroORM } from "@mikro-orm/core";
import { config } from "dotenv";
import { __prod__ } from "./constants";
import { Posts } from "./entities/Posts";
import mikroConfig from "./mikro-orm.config";
config({ path: ".env" });

(async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Posts, { title: "First One" });
  await orm.em.persistAndFlush(post);
})();
