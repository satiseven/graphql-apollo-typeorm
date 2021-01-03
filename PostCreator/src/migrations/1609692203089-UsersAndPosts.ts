import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersAndPosts1609692203089 implements MigrationInterface {
    name = 'UsersAndPosts1609692203089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pp_users` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `username` char(150) NOT NULL, `email` char(150) NOT NULL, `password` char(150) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pp_posts` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `userId` int UNSIGNED NOT NULL, `title` char(150) NOT NULL, `slug` char(150) NOT NULL, `content` text NOT NULL, `image` char(150) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `pp_posts` ADD CONSTRAINT `FK_75c13d15d2885311f3a35ec5cb6` FOREIGN KEY (`userId`) REFERENCES `pp_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pp_posts` DROP FOREIGN KEY `FK_75c13d15d2885311f3a35ec5cb6`");
        await queryRunner.query("DROP TABLE `pp_posts`");
        await queryRunner.query("DROP TABLE `pp_users`");
    }

}
