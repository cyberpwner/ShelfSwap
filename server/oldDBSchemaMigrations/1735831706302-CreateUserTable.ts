import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1735831706302 implements MigrationInterface {
  name = 'CreateUserTable1735831706302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(80) NOT NULL, \`role\` enum ('admin', 'user', 'guest') NOT NULL, \`bio\` varchar(150) NULL, \`profile_pic_url\` varchar(2048) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
    await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
    await queryRunner.query(`DROP TABLE \`User\``);
  }
}
