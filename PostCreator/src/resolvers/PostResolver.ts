import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import { CreatePostsArgs } from "../@types/CreatePostsArgs";
import { Post } from "../entity/Post";
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    const posts = Post.find({});
    return posts;
  }
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("options") options: CreatePostsArgs
  ): Promise<Post | boolean> {
    try {
      const post = Post.create({
        title: options.title,
        image: options.image,
        content: options.content,
        slug: options.slug,
        userId: options.userId,
      }).save();
      return post;
    } catch (error) {
      return false;
    }
  }
}
