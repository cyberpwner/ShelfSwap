import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePaidFromOrderStatusEnum1736354771470 implements MigrationInterface {
    name = 'RemovePaidFromOrderStatusEnum1736354771470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`status\` \`status\` enum ('to be sent', 'sent', 'in transit', 'delivered', 'completed', 'return requested', 'returned', 'refunded', 'cancelled') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`status\` \`status\` enum ('paid', 'to be sent', 'sent', 'in transit', 'delivered', 'completed', 'return requested', 'returned', 'refunded', 'cancelled') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
