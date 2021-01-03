import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreatePostsArgs {
  @Field(() => Int)
  userId: number;
  @Field(() => String)
  title: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  image: string;
  @Field(() => String)
  content: string;
}
