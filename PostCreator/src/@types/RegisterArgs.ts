import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterArgs {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  email: string;
}
