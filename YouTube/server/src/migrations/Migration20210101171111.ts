import { Migration } from '@mikro-orm/migrations';

export class Migration20210101171111 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "posts" ("id" serial primary key, "title" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
