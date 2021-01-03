import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { hash, verify } from "argon2";
import { UserResponse } from "../@types/userResponse";
import { RegisterArgs } from "./args/RegisterArgs";
@Resolver()
export class UserResolver {
  @Query(() => String)
  hey() {
    return "gey";
  }
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("option", { nullable: false }) options: RegisterArgs
  ): Promise<UserResponse> {
    const hashedPassword = await hash(options.password);
    if (options.email.length < 7) {
      return {
        errors: [
          {
            error: "Email Length should be Great than 7",
            filed: "email",
          },
        ],
      };
    }
    if (options.password.length < 7) {
      return {
        errors: [
          {
            error: "password Length should be Great than 7",
            filed: "password",
          },
        ],
      };
    }
    if (options.username.length < 7) {
      return {
        errors: [
          {
            error: "username Length should be Great than 7",
            filed: "username",
          },
        ],
      };
    }
    try {
      const user = await User.create({
        email: options.email,
        password: hashedPassword,
        username: options.username,
      }).save();
      return {
        user,
      };
    } catch (error) {
      return {
        errors: [
          {
            error: "Dublicate Entry",
            filed: "Email",
          },
        ],
      };
    }
  }
  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("email", { nullable: false }) email: string,
    @Arg("password", { nullable: false }) password: string
  ): Promise<UserResponse> {
    try {
      const user = await User.findOneOrFail({ where: { email } });
      if (await verify(user.password, password)) {
        return {
          user,
        };
      }
      return {
        errors: [
          {
            error: "Password is wrong",
            filed: "password",
          },
        ],
      };
    } catch (error) {
      return {
        errors: [
          {
            error: "Email is dismatch",
            filed: "email",
          },
        ],
      };
    }
  }
}
