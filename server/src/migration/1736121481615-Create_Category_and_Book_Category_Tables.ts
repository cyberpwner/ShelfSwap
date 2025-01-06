import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryAndBookCategoryTables1736121481615 implements MigrationInterface {
    name = 'CreateCategoryAndBookCategoryTables1736121481615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0ac420e8701e781dbf1231dc23\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book_Category\` (\`category_id\` int NOT NULL, \`book_id\` int NOT NULL, INDEX \`IDX_0746f654df374d8af0edc87d88\` (\`category_id\`), INDEX \`IDX_da64fc2adb16a0165e9058984f\` (\`book_id\`), PRIMARY KEY (\`category_id\`, \`book_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_0746f654df374d8af0edc87d885\` FOREIGN KEY (\`category_id\`) REFERENCES \`Category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_0746f654df374d8af0edc87d885\``);
        await queryRunner.query(`DROP INDEX \`IDX_da64fc2adb16a0165e9058984f\` ON \`Book_Category\``);
        await queryRunner.query(`DROP INDEX \`IDX_0746f654df374d8af0edc87d88\` ON \`Book_Category\``);
        await queryRunner.query(`DROP TABLE \`Book_Category\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ac420e8701e781dbf1231dc23\` ON \`Category\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
    }

}
