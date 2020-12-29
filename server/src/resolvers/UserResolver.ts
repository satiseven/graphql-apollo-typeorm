import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../entity/Users";
import { encrypt, verify } from "unixcrypt";
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

  @Mutation(() => Boolean)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const user = await Users.findOneOrFail({ where: { email: email } });
      return verify(password, (await user).password);
    } catch (error) {
      return false;
    }
  }
}
