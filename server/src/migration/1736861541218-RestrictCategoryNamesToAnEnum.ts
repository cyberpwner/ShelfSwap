import { MigrationInterface, QueryRunner } from "typeorm";

export class RestrictCategoryNamesToAnEnum1736861541218 implements MigrationInterface {
    name = 'RestrictCategoryNamesToAnEnum1736861541218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0ac420e8701e781dbf1231dc23\` ON \`Category\``);
        await queryRunner.query(`ALTER TABLE \`Category\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Category\` ADD \`name\` enum ('fiction', 'non-fiction', 'science', 'history', 'politics', 'biography', 'fantasy', 'mystery', 'romance', 'thriller', 'self-Help', 'business', 'technology', 'art', 'poetry', 'children') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Category\` ADD UNIQUE INDEX \`IDX_0ac420e8701e781dbf1231dc23\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Category\` DROP INDEX \`IDX_0ac420e8701e781dbf1231dc23\``);
        await queryRunner.query(`ALTER TABLE \`Category\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`Category\` ADD \`name\` varchar(50) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0ac420e8701e781dbf1231dc23\` ON \`Category\` (\`name\`)`);
    }

}
