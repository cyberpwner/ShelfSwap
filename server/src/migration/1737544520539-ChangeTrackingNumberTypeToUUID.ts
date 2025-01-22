import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTrackingNumberTypeToUUID1737544520539 implements MigrationInterface {
    name = 'ChangeTrackingNumberTypeToUUID1737544520539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3e193921be0412778af52ec394\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP COLUMN \`tracking_number\``);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD \`tracking_number\` uuid NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD UNIQUE INDEX \`IDX_3e193921be0412778af52ec394\` (\`tracking_number\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` DROP INDEX \`IDX_3e193921be0412778af52ec394\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP COLUMN \`tracking_number\``);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD \`tracking_number\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3e193921be0412778af52ec394\` ON \`Order\` (\`tracking_number\`)`);
    }

}
