import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1736127723150 implements MigrationInterface {
    name = 'CreateOrderTable1736127723150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('paid', 'to_be_sent', 'sent', 'in_transit', 'delivered', 'completed', 'return_requested', 'returned', 'refunded', 'cancelled') NOT NULL, \`tracking_number\` varchar(255) NULL, \`book_id\` int NULL, \`seller_id\` int NULL, \`buyer_id\` int NULL, UNIQUE INDEX \`IDX_3e193921be0412778af52ec394\` (\`tracking_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_1fe52f88df5760f67dc15c0adfe\` FOREIGN KEY (\`seller_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_1fe52f88df5760f67dc15c0adfe\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e193921be0412778af52ec394\` ON \`Order\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
