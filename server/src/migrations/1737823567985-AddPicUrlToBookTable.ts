import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPicUrlToBookTable1737823567985 implements MigrationInterface {
    name = 'AddPicUrlToBookTable1737823567985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`pic_url\` varchar(2048) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`pic_url\``);
    }

}
