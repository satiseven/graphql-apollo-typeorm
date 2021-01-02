import { FieldsOnCorrectTypeRule } from "graphql";
import {
  Resolver,
  Query,
  Field,
  ObjectType,
  Mutation,
  Int,
  Ctx,
  Arg,
  InputType,
} from "type-graphql";
import { hash, verify } from "argon2";

import { MyContext } from "../@types/MyContextTypes";
import { User } from "../entities/User";
@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
}
@ObjectType()
class FieldError {
  @Field(() => String, { nullable: true })
  field?: string;
  @Field(() => String, { nullable: true })
  message?: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async Users(@Ctx() { em }: MyContext): Promise<User[]> {
    return await em.find(User, {});
  }
  @Query(() => User, { nullable: true })
  User(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { id });
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });
    if (!user) {
      return {
        errors: [
          {
            field: "Email",
            message: "You email is not match with our DB",
          },
        ],
      };
    }
    const verified = await verify(user.password, options.password);
    if (!verified) {
      return {
        errors: [
          {
            field: "Password",
            message: "Incorrect Passwrod",
          },
        ],
      };
    }
    return {
      user,
    };
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.email.length < 5 || options.password.length < 7) {
      return {
        errors: [
          {
            field: "email",
            message: "Please Control Email > 5 and Pasword Length < 7",
          },
        ],
      };
    }
    const user = em.create(User, {
      email: options.email,
      password: await hash(options.password),
    });
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505" || error.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "user",
              message: "User is Dublicated",
            },
          ],
        };
      }
    }
    return {
      user,
    };
  }
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, { id });
    if (!user) return null;
    if (typeof email !== "undefined") {
      user.email = email;
      await em.persistAndFlush(user);
    }

    return user;
  }
  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    try {
      await em.nativeDelete(User, id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
