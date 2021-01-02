import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response, Express } from "express";
import { SessionData } from "express-session";
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
};
