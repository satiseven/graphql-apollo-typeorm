<<<<<<< HEAD
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./@types/ContextResReq";
import { verify } from "jsonwebtoken";
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not Auth");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.SECRET_KEY);
    context.payload = payload as any;
  } catch (error) {
    console.log("this is error");
  }
  return next();
};
=======
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
>>>>>>> 148f5c421823e0305a8ed74e04a8ebfa3e8752d6
