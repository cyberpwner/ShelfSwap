import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1736135091293 implements MigrationInterface {
    name = 'CreatePaymentTable1736135091293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`method\` enum ('debit_card', 'bizum') NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`order_id\` int NOT NULL, UNIQUE INDEX \`IDX_4a378522a08d2482d28a20efa1\` (\`order_id\`), UNIQUE INDEX \`REL_4a378522a08d2482d28a20efa1\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`price\` \`price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`price\` \`price\` decimal(10,0) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_4a378522a08d2482d28a20efa1\` ON \`Payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a378522a08d2482d28a20efa1\` ON \`Payment\``);
        await queryRunner.query(`DROP TABLE \`Payment\``);
    }

}
