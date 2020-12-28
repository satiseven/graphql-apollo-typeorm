import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Orders } from "./Orders";
import { Posts } from "./Posts";
@ObjectType()
@Entity({ name: "users" })
export class Users extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Field()
  @Column({ type: "varchar", length: 150 })
  name: string;
  @Field()
  @Column({ type: "varchar", length: 150 })
  email: string;
  @Field()
  @Column({
    type: "enum",
    enum: ["ADMIN", "EDITOR", "MODERNATOR", "COSTUMER", "READER"],
  })
  role: UserRoles;
  @Field()
  @Column({ type: "boolean", default: false })
  emailActivated: boolean;
  @Field()
  @Column({ type: "boolean", default: false })
  smsActivated: boolean;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
  @Field()
  @OneToMany(() => Address, (address) => address.user)
  address: [Address];
  @Field()
  @OneToMany(() => Orders, (order) => order.user)
  orders: [Orders];
  @Field()
  @OneToMany(() => Posts, (post) => post.user)
  posts: [Posts];
}
