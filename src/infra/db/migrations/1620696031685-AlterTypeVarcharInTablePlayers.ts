import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTypeVarcharInTablePlayers1620696031685
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "players" ALTER COLUMN age TYPE varchar USING age::varchar;`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" ALTER COLUMN "birth_date" TYPE varchar USING "birth_date"::varchar;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "players" ALTER COLUMN age TYPE date USING age::date;`,
    );

    await queryRunner.query(
      `ALTER TABLE "players" ALTER COLUMN "birth_date" TYPE date USING "birth_date"::date;`,
    );
  }
}
