import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { MyContext } from "../@types/MyContext";
import { logger } from "../helpers/logger";
import path from "path";
export class isAuth implements MiddlewareInterface<MyContext> {
  async use({ context, info }: ResolverData<MyContext>, next: NextFn) {
    const username: string = context.req.session.userId || "guest";
    if (context.req?.session?.userId) {
      return next();
    }
    logger.error("user is not logged in but wants to insert post" + Date());
  }
}
