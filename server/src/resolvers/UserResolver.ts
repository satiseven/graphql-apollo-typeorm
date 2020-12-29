import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Users } from "../entity/Users";
import { encrypt, verify } from "unixcrypt";
import { sign } from "jsonwebtoken";
import { MyContext } from "../@types/ContextResReq";
import { createAccessToken, createRefreshToken } from "../Auth";
@ObjectType()
class loginResponse {
  @Field(() => String)
  accessToken: string;
}
@Resolver()
export class UserResolver {
  @Query(() => [Users])
  getUsers() {
    return Users.find({});
  }
  @Mutation(() => Users)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role") role: UserRoles,
    @Arg("emailActivated") emailActivated: boolean,
    @Arg("smsActivated") smsActivated: boolean
  ) {
    // const HashedCrypt = hashSync(password, process.env.SALT);
    const HashedCrypt = await encrypt(password, "$5");
    return Users.create({
      email,
      password: HashedCrypt,
      name,
      role,
      emailActivated,
      smsActivated,
    }).save();
  }

  @Mutation(() => loginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<loginResponse | boolean> {
    try {
      const user = await Users.findOneOrFail({ where: { email: email } });
      if (verify(password, (await user).password)) {
        res.cookie("apollo", createRefreshToken(user), {
          httpOnly: true,
        });

        return {
          accessToken: createAccessToken(user),
        };
      } else {
        throw "can not find user";
      }
    } catch (error) {
      throw "can not find user";
    }
  }
}
