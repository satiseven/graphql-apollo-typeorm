import { promises } from "fs";
import { FieldsOnCorrectTypeRule } from "graphql";
import {
  Resolver,
  Query,
  Field,
  Mutation,
  Int,
  Ctx,
  Arg,
  InputType,
} from "type-graphql";
import { hash } from "argon2";

import { MyContext } from "../@types/MyContextTypes";
import { User } from "../entities/User";
@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
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
  @Mutation(() => User)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const user = em.create(User, {
      email: options.email,
      password: await hash(options.password),
    });
    await em.persistAndFlush(user);
    return user;
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
