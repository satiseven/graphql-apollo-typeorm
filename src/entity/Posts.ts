import { ObjectType, Field, Int } from "type-graphql";
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
@Entity({ name: "posts" })
export class Posts extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Field(() => Int)
  @Column({ type: "integer", unsigned: true })
  userId: number;
  @Field()
  @Column({ type: "varchar", length: 150 })
  tite: string;
  @Field()
  @Column({ type: "text" })
  content: string;
  @Field()
  @Column({ type: "varchar", length: 200 })
  img: string;
  @Field()
  @Column({ type: "varchar", length: 150 })
  slug: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: Users;
}
