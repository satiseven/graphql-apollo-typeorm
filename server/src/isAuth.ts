import {
  MiddlewareFn,
  MiddlewareInterface,
  NextFn,
  ResolverData,
} from "type-graphql";
import { MyContext } from "./@types/ContextResReq";

import { verifyToken } from "./Auth";

export class ResolveTime implements MiddlewareInterface<MyContext> {
  async use({ context, info }: ResolverData<MyContext>, next: NextFn) {
    //context.req.cookies();
    if (verifyToken(context.req.cookies["apollo"])) {
      return next();
    }

    throw "Token Mismatch";
    // this.logger.log(
    //   "info",
    //   `Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`
    // );
  }
}
