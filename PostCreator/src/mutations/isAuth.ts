import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { MyContext } from "../@types/MyContext";

export class isAuth implements MiddlewareInterface<MyContext> {
  async use({ context, info }: ResolverData<MyContext>, next: NextFn) {
    const username: string = context.req.session.userId || "guest";
    if (context.req?.session?.userId) {
      console.log("Is Logged");
      return next();
    }
    console.log("Dosent logged in");
  }
}
