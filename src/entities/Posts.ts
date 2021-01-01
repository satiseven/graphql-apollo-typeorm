import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Posts {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;
  @Field(() => String)
  @Property()
  title!: string;
  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();
  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
