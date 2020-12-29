import { ObjectType, Field, Int, Float } from "type-graphql";
import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
/**
 * @param myparam the paramet for this prom
 * TODO Should remove this method
 * !remember that should remove this method
 */
import { Users } from "./Users";
@ObjectType()
@Entity({ name: "orders" })
export class Orders extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Field(() => Int)
  @Column({ type: "integer", unsigned: true })
  userId: number;
  @Field(() => Float)
  @Column({ type: "integer", unsigned: true })
  price: number;
  @Field(() => Int)
  @Column({ type: "tinyint", unsigned: true })
  payMethod: number;
  @Field(() => Int)
  @Column({ type: "tinyint", unsigned: true })
  status: number;
  @Field(() => Boolean)
  @Column({ type: "boolean" })
  isPaid: boolean;
  @Field()
  @Column({ type: "text" })
  products: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;
}
