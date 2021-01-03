import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { hash, verify } from "argon2";
@Resolver()
export class UserResolver {
  @Query(() => String)
  hey() {
    return "gey";
  }
  @Mutation(() => User)
  async createUser(
    @Arg("email", { nullable: false }) email: string,
    @Arg("username", { nullable: false }) username: string,
    @Arg("password", { nullable: false }) password: string
  ) {
    const hashedPassword = await hash(password);
    return User.create({
      email,
      password: hashedPassword,
      username,
    }).save();
  }
  @Mutation(() => Boolean)
  async userLogin(
    @Arg("email", { nullable: false }) email: string,
    @Arg("email", { nullable: false }) password: string
  ) {
    try {
      const user = await User.findOneOrFail({ where: { email } });
      if (verify(user.password, password)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
