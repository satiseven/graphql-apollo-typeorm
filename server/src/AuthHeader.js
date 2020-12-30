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
