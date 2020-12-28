import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  @Field(() => Boolean)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
  @Field()
  @Column({ type: "boolean", default: false })
  emailActivated: boolean;
  @Field()
  @Column({ type: "boolean", default: false })
  smsActivated: boolean;
  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: string;
}
