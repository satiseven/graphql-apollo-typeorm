import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class FieldError {
  @Field(() => String, { nullable: true })
  filed?: string;
  @Field(() => String, { nullable: true })
  error: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
