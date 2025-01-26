import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePicUrlAndProfilePicUrlToCoverUrlAndAvatarUrl1737849753376 implements MigrationInterface {
    name = 'ChangePicUrlAndProfilePicUrlToCoverUrlAndAvatarUrl1737849753376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`profile_pic_url\` \`avatar_url\` varchar(2048) NULL`);
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`pic_url\` \`cover_url\` varchar(2048) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Book\` CHANGE \`cover_url\` \`pic_url\` varchar(2048) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`avatar_url\` \`profile_pic_url\` varchar(2048) NULL`);
    }

}
