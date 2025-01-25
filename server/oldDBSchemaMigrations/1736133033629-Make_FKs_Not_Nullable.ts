import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeFKsNotNullable1736133033629 implements MigrationInterface {
    name = 'MakeFKsNotNullable1736133033629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`book_id\` \`book_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`buyer_id\` \`buyer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_91ce9ef13dbc8654c348d696b64\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_3e29e3fc28438e7e3667db6e459\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_33edad7ab0e802d0ef7ec9e0b4e\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\``);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_91ce9ef13dbc8654c348d696b64\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`buyer_id\` \`buyer_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`book_id\` \`book_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1adb2b81f0ee7fe86a8da08803\` ON \`Order\` (\`book_id\`, \`buyer_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_3e29e3fc28438e7e3667db6e459\` FOREIGN KEY (\`buyer_id\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_33edad7ab0e802d0ef7ec9e0b4e\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
