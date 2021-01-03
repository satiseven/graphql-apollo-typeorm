import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity({ tableName: "users" })
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;
  @Field(() => String)
  @Property({ unique: true })
  email!: string;
  @Field(() => String)
  @Property()
  password!: string;
  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();
  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
