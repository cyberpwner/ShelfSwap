import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartAndCartItemTables1737920829714 implements MigrationInterface {
    name = 'CreateCartAndCartItemTables1737920829714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Cart\` (\`id\` uuid NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_fdca14193d9766891f94430460\` (\`user_id\`), UNIQUE INDEX \`REL_fdca14193d9766891f94430460\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Cart_Item\` (\`id\` uuid NOT NULL, \`quantity\` int UNSIGNED NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cart_id\` uuid NOT NULL, \`book_id\` uuid NOT NULL, UNIQUE INDEX \`IDX_8876dc1b455cf2410c824d9c8c\` (\`cart_id\`, \`book_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Cart\` ADD CONSTRAINT \`FK_fdca14193d9766891f94430460f\` FOREIGN KEY (\`user_id\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Cart_Item\` ADD CONSTRAINT \`FK_286031d05034b26e29b75997953\` FOREIGN KEY (\`cart_id\`) REFERENCES \`Cart\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Cart_Item\` ADD CONSTRAINT \`FK_61881cd8aeee1d8aa453b77dc15\` FOREIGN KEY (\`book_id\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cart_Item\` DROP FOREIGN KEY \`FK_61881cd8aeee1d8aa453b77dc15\``);
        await queryRunner.query(`ALTER TABLE \`Cart_Item\` DROP FOREIGN KEY \`FK_286031d05034b26e29b75997953\``);
        await queryRunner.query(`ALTER TABLE \`Cart\` DROP FOREIGN KEY \`FK_fdca14193d9766891f94430460f\``);
        await queryRunner.query(`DROP INDEX \`IDX_8876dc1b455cf2410c824d9c8c\` ON \`Cart_Item\``);
        await queryRunner.query(`DROP TABLE \`Cart_Item\``);
        await queryRunner.query(`DROP INDEX \`REL_fdca14193d9766891f94430460\` ON \`Cart\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdca14193d9766891f94430460\` ON \`Cart\``);
        await queryRunner.query(`DROP TABLE \`Cart\``);
    }

}
