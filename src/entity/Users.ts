import { ObjectType, Field, Int } from "type-graphql";
import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
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
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  @Column({ type: "boolean", default: false })
  emailActivated: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  @Column({ type: "boolean", default: false })
  smsActivated: boolean;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
  @OneToMany(() => Address, (address) => address.user)
  @Field(() => [Address])
  address: [Address];
  @OneToMany(() => Orders, (order) => order.user)
  @Field(() => [Orders])
  orders: [Orders];
  @OneToMany(() => Posts, (post) => post.user)
  @Field(() => [Posts])
  posts: [Posts];
}
