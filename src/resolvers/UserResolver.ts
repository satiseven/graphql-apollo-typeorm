import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../entity/Users";
@Resolver()
export class UserResolver {
  @Query(() => [Users])
  getUsers() {
    return Users.find({});
  }
  @Mutation(() => Users)
  createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("role") role: UserRoles,
    @Arg("emailActivated") emailActivated: boolean,
    @Arg("smsActivated") smsActivated: boolean,
    @Arg("password") password: string
  ) {
    return Users.create({
      email,
      password,
      name,
      role,
      emailActivated,
      smsActivated,
    }).save();
  }
}
