import "reflect-metadata";

import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
@ObjectType()
@Entity({ name: "posts" })
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;
  @Field(() => Int)
  @Column({ type: "int", unsigned: true })
  userId: number;
  @Field(() => String)
  @Column({ type: "char", length: 150 })
  title: string;
  @Field(() => String)
  @Column({ type: "char", length: 150, unique: true })
  slug: string;
  @Field(() => String)
  @Column({ type: "text" })
  content: string;
  @Field(() => String)
  @Column({ type: "char", length: 150 })
  image: string;
  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user)
  user: User;
}
