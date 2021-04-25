import {MigrationInterface, QueryRunner} from "typeorm";

export class init1619265731618 implements MigrationInterface {
    name = 'init1619265731618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "modified" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "summonerId" character varying NOT NULL, "summonerName" character varying NOT NULL, "discordId" character varying NOT NULL, CONSTRAINT "UQ_7cf3c172483f9b99f965ee4b63d" UNIQUE ("summonerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
