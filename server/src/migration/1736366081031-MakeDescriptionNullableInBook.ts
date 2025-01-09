import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeDescriptionNullableInBook1736366081031 implements MigrationInterface {
    name = 'MakeDescriptionNullableInBook1736366081031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

}
