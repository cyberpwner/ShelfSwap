import { MigrationInterface, QueryRunner } from "typeorm";

export class RetouchesOnSomeTables1736130248590 implements MigrationInterface {
    name = 'RetouchesOnSomeTables1736130248590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`condition\` enum ('new', 'like new', 'very good', 'good', 'acceptable') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`status\` \`status\` enum ('paid', 'to be sent', 'sent', 'in transit', 'delivered', 'completed', 'return requested', 'returned', 'refunded', 'cancelled') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\` (\`book_id\`, \`seller_id\`, \`buyer_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`status\` \`status\` enum ('paid', 'to_be_sent', 'sent', 'in_transit', 'delivered', 'completed', 'return_requested', 'returned', 'refunded', 'cancelled') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`condition\``);
    }

}
