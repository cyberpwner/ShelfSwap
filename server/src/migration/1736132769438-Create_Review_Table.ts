import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviewTable1736132769438 implements MigrationInterface {
    name = 'CreateReviewTable1736132769438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('seller_to_buyer', 'buyer_to_seller') NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL, \`comment\` varchar(255) NULL, \`order_id\` int NOT NULL, UNIQUE INDEX \`IDX_2068e8e971d395144fcd25db1d\` (\`order_id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Review\` ADD CONSTRAINT \`FK_e299848a17c2dba8186d97d753a\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Review\` DROP FOREIGN KEY \`FK_e299848a17c2dba8186d97d753a\``);
        await queryRunner.query(`DROP INDEX \`IDX_2068e8e971d395144fcd25db1d\` ON \`Review\``);
        await queryRunner.query(`DROP TABLE \`Review\``);
    }

}
