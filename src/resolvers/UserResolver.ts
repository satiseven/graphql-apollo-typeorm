import { Query, Resolver } from "type-graphql";
import { Users } from "../entity/Users";
@Resolver()
export class UserResolver {
  @Query(() => [Users])
  getUsers() {
    return Users.find({});
  }
}
