import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAppToNormalBookStore1736456018043 implements MigrationInterface {
    name = 'ChangeAppToNormalBookStore1736456018043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
        await queryRunner.query(`CREATE TABLE \`Author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78e2065c442428b64a16f577c6\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book_Author\` (\`author_id\` int NOT NULL, \`book_id\` int NOT NULL, INDEX \`IDX_21120f8eaae6c7f630e79d5dc9\` (\`author_id\`), INDEX \`IDX_0cb3f9e8b6c7362f46795b9bc7\` (\`book_id\`), PRIMARY KEY (\`author_id\`, \`book_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`is_sold\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`condition\``);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`isbn\` varchar(13) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD \`quantity\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`ALTER TABLE \`Address\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`ALTER TABLE \`Review\` CHANGE \`order_id\` \`order_id\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_2068e8e971d395144fcd25db1d\` ON \`Review\``);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD UNIQUE INDEX \`IDX_e299848a17c2dba8186d97d753\` (\`order_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` CHANGE \`order_id\` \`order_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`book_id\` \`book_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`buyer_id\` \`buyer_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e299848a17c2dba8186d97d753\` ON \`Review\` (\`order_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` ADD CONSTRAINT \`FK_21120f8eaae6c7f630e79d5dc90\` FOREIGN KEY (\`author_id\`) REFERENCES \`Author\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` ADD CONSTRAINT \`FK_0cb3f9e8b6c7362f46795b9bc7f\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book_Author\` DROP FOREIGN KEY \`FK_0cb3f9e8b6c7362f46795b9bc7f\``);
        await queryRunner.query(`ALTER TABLE \`Book_Author\` DROP FOREIGN KEY \`FK_21120f8eaae6c7f630e79d5dc90\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_4a378522a08d2482d28a20efa17\``);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_5bfdf4977aea99953728c6e1de3\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\``);
        await queryRunner.query(`DROP INDEX \`REL_e299848a17c2dba8186d97d753\` ON \`Review\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`buyer_id\` \`buyer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`book_id\` \`book_id\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_4b51305d9b776e4586cc4f8c9f\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Payment\` CHANGE \`order_id\` \`order_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_4a378522a08d2482d28a20efa17\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Review\` DROP INDEX \`IDX_e299848a17c2dba8186d97d753\``);
        await queryRunner.query(`ALTER TABLE \`Review\` CHANGE \`order_id\` \`order_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Address\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_5bfdf4977aea99953728c6e1de3\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP COLUMN \`isbn\``);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`condition\` enum ('new', 'like new', 'very good', 'good', 'acceptable') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`is_sold\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD \`author\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_0cb3f9e8b6c7362f46795b9bc7\` ON \`Book_Author\``);
        await queryRunner.query(`DROP INDEX \`IDX_21120f8eaae6c7f630e79d5dc9\` ON \`Book_Author\``);
        await queryRunner.query(`DROP TABLE \`Book_Author\``);
        await queryRunner.query(`DROP INDEX \`IDX_78e2065c442428b64a16f577c6\` ON \`Author\``);
        await queryRunner.query(`DROP TABLE \`Author\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2068e8e971d395144fcd25db1d\` ON \`Review\` (\`order_id\`, \`type\`)`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
