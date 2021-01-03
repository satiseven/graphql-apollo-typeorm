import { promises } from "fs";
import { Resolver, Query, Mutation, Int, Ctx, Arg } from "type-graphql";
import { MyContext } from "../@types/MyContextTypes";
import { Posts } from "../entities/Posts";
@Resolver()
export class PostResolver {
  @Query(() => [Posts])
  Posts(@Ctx() { em }: MyContext): Promise<Posts[]> {
    return em.find(Posts, {});
  }
  @Query(() => Posts, { nullable: true })
  Post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Posts | null> {
    return em.findOne(Posts, { id });
  }
  @Mutation(() => Posts)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Posts> {
    const post = em.create(Posts, { title });
    await em.persistAndFlush(post);
    return post;
  }
  @Mutation(() => Posts)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Posts | null> {
    const post = await em.findOne(Posts, { id });
    if (!post) return null;
    if (typeof title !== "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }

    return post;
  }
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    try {
      await em.nativeDelete(Posts, id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
