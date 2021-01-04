import {
  Arg,
  Ctx,
  Field,
  Mutation,
  UseMiddleware,
  Query,
  Resolver,
} from "type-graphql";
import { ContextResponse } from "../@types/ContextResponse";
import { CreatePostsArgs } from "../@types/CreatePostsArgs";
import "reflect-metadata";
import { Post } from "../entity/Post";
import { isAuth } from "../mutations/isAuth";
import { MyContext } from "../@types/MyContext";
import session from "express-session";
@Resolver()
export class PostResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext) {
    return `Your user id : ${payload!.userId}`;
  }

  @Query(() => [Post], { nullable: true })
  @UseMiddleware(isAuth)
  posts(@Ctx() { payload, req }: MyContext): Promise<Post[] | null> {
    const posts = Post.find({ where: { userId: req.session.userId } });
    return posts;
  }
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("options") options: CreatePostsArgs,
    @Ctx() { req }: ContextResponse
  ): Promise<Post | boolean> {
    try {
      const post = Post.create({
        title: options.title,
        image: options.image,
        content: options.content,
        slug: options.slug,
        userId: req.session.userId,
      }).save();
      return post;
    } catch (error) {
      return false;
    }
  }
}
