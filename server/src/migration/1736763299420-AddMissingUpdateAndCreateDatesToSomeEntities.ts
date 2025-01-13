import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingUpdateAndCreateDatesToSomeEntities1736763299420 implements MigrationInterface {
    name = 'AddMissingUpdateAndCreateDatesToSomeEntities1736763299420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Address\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP COLUMN \`created_at\``);
    }

}
