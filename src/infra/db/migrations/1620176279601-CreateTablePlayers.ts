import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlayers1620176279601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "players" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "surname" character varying NOT NULL,
        "number_position" character varying NOT NULL,
        "last_attented" character varying NOT NULL,
        "country" character varying NOT NULL,
        "height" character varying NOT NULL,
        "weight" character varying NOT NULL,
        "experience" character varying NOT NULL,
        "age" date NOT NULL,
        "birth_date" date NOT NULL, 
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "players_pk" PRIMARY KEY ("id"));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "players";`);
  }
}
