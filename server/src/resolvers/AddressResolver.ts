import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Address } from "../entity/Address";
@Resolver()
export class AddressResolver {
  @Query(() => [Address])
  async addressList() {
    return Address.find({});
  }
  @Mutation(() => Address)
  async createAddress(
    @Arg("title") title: string,
    @Arg("userId") userId: number,
    @Arg("ilce") ilce: number,
    @Arg("tc") tc: string,
    @Arg("phone") phone: string,
    @Arg("address") address: string
  ) {
    return Address.create({ address, phone, ilce, title, userId, tc }).save();
  }
}
