import { ObjectType, Field, Int } from "type-graphql";
import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
@ObjectType()
@Entity({ name: "address" })
export class Address extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Field(() => Int)
  @Column({ type: "integer", unsigned: true })
  userId: number;
  @Field()
  @Column({ type: "varchar", length: 150 })
  title: string;
  @Field(() => Int)
  @Column({ type: "smallint", unsigned: true })
  ilce: number;
  @Field()
  @Column({ type: "varchar", length: 11 })
  tc: string;
  @Field()
  @Column({ type: "varchar", length: 11 })
  phone: string;
  @Field()
  @Column({ type: "text" })
  address: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
  @ManyToOne(() => Users, (user) => user.address)
  user: Users;
}
