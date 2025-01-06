import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookTable1735835453414 implements MigrationInterface {
  name = 'CreateBookTable1735835453414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`author\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`is_sold\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
    await queryRunner.query(`DROP TABLE \`Book\``);
  }
}
