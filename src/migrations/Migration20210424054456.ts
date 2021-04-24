import { Migration } from '@mikro-orm/migrations';

export class Migration20210424054456 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted" bool not null, "summoner_id" varchar(255) not null, "summoner_name" varchar(255) not null, "discord_id" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
    this.addSql('alter table "user" add constraint "user_summoner_id_unique" unique ("summoner_id");');
  }

}
