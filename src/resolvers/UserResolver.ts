import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../entity/Users";
import { hashSync, compareSync } from "bcryptjs";

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
      password: hashSync(password, process.env.SALT),
      name,
      role,
      emailActivated,
      smsActivated,
    }).save();
  }
}
