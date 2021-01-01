import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "../@types/MyContextTypes";
import { Posts } from "../entities/Posts";

@Resolver()
export class PostResolver {
  @Query(() => [Posts])
  Posts(@Ctx() { em }: MyContext): Promise<Posts[]> {
    return em.find(Posts, {});
  }
}
