import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTypoInUpdatedAtInOrderItem1736763031152 implements MigrationInterface {
    name = 'FixTypoInUpdatedAtInOrderItem1736763031152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order_Item\` CHANGE \`update_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order_Item\` CHANGE \`updated_at\` \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

}
