import { MigrationInterface, QueryRunner } from "typeorm";

export class Unit1734948972881 implements MigrationInterface {
    name = 'Unit1734948972881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "building" character varying NOT NULL, "locationName" character varying NOT NULL, "locationNumber" character varying NOT NULL, "area" double precision, "parentId" integer, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_9123571b1f7aadc5ee8a6f3f152" FOREIGN KEY ("parentId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_9123571b1f7aadc5ee8a6f3f152"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
