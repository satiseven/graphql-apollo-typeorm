import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import { MyContext } from "../@types/MyContext";
export class LogAccess implements MiddlewareInterface<MyContext> {
  async use({ context, info }: ResolverData<MyContext>, next: NextFn) {
    return next();
  }
}
