import { MigrationInterface, QueryRunner } from "typeorm";

export class FixReviewTable1736795917752 implements MigrationInterface {
    name = 'FixReviewTable1736795917752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`DROP INDEX \`IDX_e299848a17c2dba8186d97d753\` ON \`Review\``);
        await queryRunner.query(`DROP INDEX \`REL_e299848a17c2dba8186d97d753\` ON \`Review\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`buyer_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`order_id\``);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`book_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_424f78086f99e2c02be9b3ebb7\` ON \`Review\` (\`book_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_ea9c5d91a8f6b4d140bc278d4d2\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_f56d7c1bc44e2ae5aa53584f41a\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_8a7c8fd5a1a997d18774b7f2b24\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_8a7c8fd5a1a997d18774b7f2b24\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_f56d7c1bc44e2ae5aa53584f41a\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_ea9c5d91a8f6b4d140bc278d4d2\``);
        await queryRunner.query(`DROP INDEX \`IDX_424f78086f99e2c02be9b3ebb7\` ON \`Review\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`book_id\``);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`order_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`user_id\` \`buyer_id\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e299848a17c2dba8186d97d753\` ON \`Review\` (\`order_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e299848a17c2dba8186d97d753\` ON \`Review\` (\`order_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
