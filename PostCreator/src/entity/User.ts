import "reflect-metadata";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Int, Field, ObjectType } from "type-graphql";
import { Post } from "./Post";
@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;
  @Field(() => String)
  @Column({ type: "char", length: 150, unique: true })
  username: string;
  @Field(() => String)
  @Column({ type: "char", length: 150, unique: true })
  email: string;
  @Field(() => String)
  @Column({ type: "char", length: 150 })
  password: string;
  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: [Post];
}
