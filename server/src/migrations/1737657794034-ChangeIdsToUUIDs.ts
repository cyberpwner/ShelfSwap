import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIdsToUUIDs1737657794034 implements MigrationInterface {
    name = 'ChangeIdsToUUIDs1737657794034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` uuid NOT NULL, \`name\` enum ('fiction', 'non-fiction', 'science', 'history', 'politics', 'biography', 'fantasy', 'mystery', 'romance', 'thriller', 'self-Help', 'business', 'technology', 'art', 'poetry', 'children') NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0ac420e8701e781dbf1231dc23\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Author\` (\`id\` uuid NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78e2065c442428b64a16f577c6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Address\` (\`id\` uuid NOT NULL, \`city\` varchar(100) NOT NULL, \`address_line1\` varchar(150) NOT NULL, \`address_line2\` varchar(150) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_5bfdf4977aea99953728c6e1de\` (\`user_id\`), UNIQUE INDEX \`REL_5bfdf4977aea99953728c6e1de\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` uuid NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(80) NOT NULL, \`role\` enum ('admin', 'user', 'guest') NOT NULL, \`bio\` varchar(150) NULL, \`profile_pic_url\` varchar(2048) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_29a05908a0fa0728526d283365\` (\`username\`), UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Payment\` (\`id\` uuid NOT NULL, \`method\` enum ('debit_card', 'bizum') NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_4a378522a08d2482d28a20efa1\` (\`order_id\`), UNIQUE INDEX \`REL_4a378522a08d2482d28a20efa1\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` uuid NOT NULL, \`status\` enum ('to be sent', 'sent', 'in transit', 'delivered', 'completed', 'return requested', 'returned', 'refunded', 'cancelled') NOT NULL, \`tracking_number\` uuid NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_3e193921be0412778af52ec394\` (\`tracking_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order_Item\` (\`id\` uuid NOT NULL, \`quantity\` int UNSIGNED NOT NULL, \`price_at_purchase\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order_id\` uuid NOT NULL, \`book_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_ece9cba1874564f86ecabc7066\` (\`order_id\`, \`book_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book\` (\`id\` uuid NOT NULL, \`isbn\` varchar(13) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`price\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_6fa3b62dd8b04061475bb006b4\` (\`isbn\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Review\` (\`id\` uuid NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL, \`comment\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`book_id\` uuid NULL, \`user_id\` uuid NULL, UNIQUE INDEX \`IDX_424f78086f99e2c02be9b3ebb7\` (\`book_id\`, \`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book_Category\` (\`category_id\` uuid NOT NULL, \`book_id\` uuid NOT NULL, INDEX \`IDX_0746f654df374d8af0edc87d88\` (\`category_id\`), INDEX \`IDX_da64fc2adb16a0165e9058984f\` (\`book_id\`), PRIMARY KEY (\`category_id\`, \`book_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book_Author\` (\`author_id\` uuid NOT NULL, \`book_id\` uuid NOT NULL, INDEX \`IDX_21120f8eaae6c7f630e79d5dc9\` (\`author_id\`), INDEX \`IDX_0cb3f9e8b6c7362f46795b9bc7\` (\`book_id\`), PRIMARY KEY (\`author_id\`, \`book_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_8a7c8fd5a1a997d18774b7f2b24\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order_Item\` ADD CONSTRAINT \`FK_0dee34df1b9ecba6d3008526d6f\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order_Item\` ADD CONSTRAINT \`FK_556c5bc7072391c330537fcc460\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_ea9c5d91a8f6b4d140bc278d4d2\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_f56d7c1bc44e2ae5aa53584f41a\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_0746f654df374d8af0edc87d885\` FOREIGN KEY (\`category_id\`) REFERENCES \`Category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` ADD CONSTRAINT \`FK_da64fc2adb16a0165e9058984f5\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` ADD CONSTRAINT \`FK_21120f8eaae6c7f630e79d5dc90\` FOREIGN KEY (\`author_id\`) REFERENCES \`Author\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` ADD CONSTRAINT \`FK_0cb3f9e8b6c7362f46795b9bc7f\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Author\` DROP FOREIGN KEY \`FK_0cb3f9e8b6c7362f46795b9bc7f\``);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` DROP FOREIGN KEY \`FK_21120f8eaae6c7f630e79d5dc90\``);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_da64fc2adb16a0165e9058984f5\``);
        await queryRunner.query(`ALTER TABLE \`Book_Category\` DROP FOREIGN KEY \`FK_0746f654df374d8af0edc87d885\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_f56d7c1bc44e2ae5aa53584f41a\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_ea9c5d91a8f6b4d140bc278d4d2\``);
        await queryRunner.query(`ALTER TABLE \`Order_Item\` DROP FOREIGN KEY \`FK_556c5bc7072391c330537fcc460\``);
        await queryRunner.query(`ALTER TABLE \`Order_Item\` DROP FOREIGN KEY \`FK_0dee34df1b9ecba6d3008526d6f\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_8a7c8fd5a1a997d18774b7f2b24\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`DROP INDEX \`IDX_0cb3f9e8b6c7362f46795b9bc7\` ON \`Book_Author\``);
        await queryRunner.query(`DROP INDEX \`IDX_21120f8eaae6c7f630e79d5dc9\` ON \`Book_Author\``);
        await queryRunner.query(`DROP TABLE \`Book_Author\``);
        await queryRunner.query(`DROP INDEX \`IDX_da64fc2adb16a0165e9058984f\` ON \`Book_Category\``);
        await queryRunner.query(`DROP INDEX \`IDX_0746f654df374d8af0edc87d88\` ON \`Book_Category\``);
        await queryRunner.query(`DROP TABLE \`Book_Category\``);
        await queryRunner.query(`DROP INDEX \`IDX_424f78086f99e2c02be9b3ebb7\` ON \`Review\``);
        await queryRunner.query(`DROP TABLE \`Review\``);
        await queryRunner.query(`DROP INDEX \`IDX_6fa3b62dd8b04061475bb006b4\` ON \`Book\``);
        await queryRunner.query(`DROP TABLE \`Book\``);
        await queryRunner.query(`DROP INDEX \`IDX_ece9cba1874564f86ecabc7066\` ON \`Order_Item\``);
        await queryRunner.query(`DROP TABLE \`Order_Item\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e193921be0412778af52ec394\` ON \`Order\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP INDEX \`REL_4a378522a08d2482d28a20efa1\` ON \`Payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a378522a08d2482d28a20efa1\` ON \`Payment\``);
        await queryRunner.query(`DROP TABLE \`Payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP INDEX \`IDX_29a05908a0fa0728526d283365\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`REL_5bfdf4977aea99953728c6e1de\` ON \`Address\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bfdf4977aea99953728c6e1de\` ON \`Address\``);
        await queryRunner.query(`DROP TABLE \`Address\``);
        await queryRunner.query(`DROP INDEX \`IDX_78e2065c442428b64a16f577c6\` ON \`Author\``);
        await queryRunner.query(`DROP TABLE \`Author\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ac420e8701e781dbf1231dc23\` ON \`Category\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
    }

}
