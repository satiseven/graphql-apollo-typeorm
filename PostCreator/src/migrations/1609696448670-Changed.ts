import {MigrationInterface, QueryRunner} from "typeorm";

export class Changed1609696448670 implements MigrationInterface {
    name = 'Changed1609696448670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pp_posts` DROP FOREIGN KEY `UserIdToUserTableIdField`");
        await queryRunner.query("ALTER TABLE `pp_users` CHANGE `username` `username` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_users` ADD UNIQUE INDEX `IDX_4bd3146b66e47b7a5dda90a078` (`username`)");
        await queryRunner.query("ALTER TABLE `pp_users` CHANGE `email` `email` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_users` ADD UNIQUE INDEX `IDX_7571e82f08d211d4844bb130f0` (`email`)");
        await queryRunner.query("ALTER TABLE `pp_posts` CHANGE `slug` `slug` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_posts` ADD UNIQUE INDEX `IDX_f39634e7f7d807d44a2ed07fbb` (`slug`)");
        await queryRunner.query("ALTER TABLE `pp_posts` ADD CONSTRAINT `FK_75c13d15d2885311f3a35ec5cb6` FOREIGN KEY (`userId`) REFERENCES `pp_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pp_posts` DROP FOREIGN KEY `FK_75c13d15d2885311f3a35ec5cb6`");
        await queryRunner.query("ALTER TABLE `pp_posts` DROP INDEX `IDX_f39634e7f7d807d44a2ed07fbb`");
        await queryRunner.query("ALTER TABLE `pp_posts` CHANGE `slug` `slug` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_users` DROP INDEX `IDX_7571e82f08d211d4844bb130f0`");
        await queryRunner.query("ALTER TABLE `pp_users` CHANGE `email` `email` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_users` DROP INDEX `IDX_4bd3146b66e47b7a5dda90a078`");
        await queryRunner.query("ALTER TABLE `pp_users` CHANGE `username` `username` char(150) NOT NULL");
        await queryRunner.query("ALTER TABLE `pp_posts` ADD CONSTRAINT `UserIdToUserTableIdField` FOREIGN KEY (`userId`) REFERENCES `pp_users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
