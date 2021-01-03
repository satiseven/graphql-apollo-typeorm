import { Arg, Ctx, Field, Mutation, Query, Resolver } from "type-graphql";
import { ContextResponse } from "../@types/ContextResponse";
import { CreatePostsArgs } from "../@types/CreatePostsArgs";
import "reflect-metadata";
import { Post } from "../entity/Post";
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { req, res }: ContextResponse): Promise<Post[]> {
    const posts = Post.find({ where: { userId: req.session.userId } });
    return posts;
  }
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("options") options: CreatePostsArgs,
    @Ctx() { req }: ContextResponse
  ): Promise<Post | boolean> {
    try {
      console.log(req.session);

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
