import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1736175586387 implements MigrationInterface {
    name = 'CreateAddressTable1736175586387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(100) NOT NULL, \`address_line1\` varchar(150) NOT NULL, \`address_line2\` varchar(150) NULL, \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_5bfdf4977aea99953728c6e1de\` (\`user_id\`), UNIQUE INDEX \`REL_5bfdf4977aea99953728c6e1de\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`DROP INDEX \`REL_5bfdf4977aea99953728c6e1de\` ON \`Address\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bfdf4977aea99953728c6e1de\` ON \`Address\``);
        await queryRunner.query(`DROP TABLE \`Address\``);
    }

}
