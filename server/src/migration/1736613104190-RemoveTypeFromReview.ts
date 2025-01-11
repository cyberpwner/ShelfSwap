import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTypeFromReview1736613104190 implements MigrationInterface {
    name = 'RemoveTypeFromReview1736613104190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Review\` DROP COLUMN \`type\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Review\` ADD \`type\` enum ('seller_to_buyer', 'buyer_to_seller') NOT NULL`);
    }

}
