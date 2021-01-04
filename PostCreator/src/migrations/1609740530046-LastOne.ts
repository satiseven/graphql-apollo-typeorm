import {MigrationInterface, QueryRunner} from "typeorm";

export class LastOne1609740530046 implements MigrationInterface {
    name = 'LastOne1609740530046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `dd_users` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `username` char(150) NOT NULL, `email` char(150) NOT NULL, `password` char(150) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_d2cd9335366d7fd1c905f7a1f9` (`username`), UNIQUE INDEX `IDX_d2382dee879fcb1607e04fc195` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dd_posts` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `userId` int UNSIGNED NOT NULL, `title` char(150) NOT NULL, `slug` char(150) NOT NULL, `content` text NOT NULL, `image` char(150) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX `IDX_dbf3e97d02e4341c5d0b790fab` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `dd_posts` ADD CONSTRAINT `FK_6b17325aa9c9f7e10560ede7a7a` FOREIGN KEY (`userId`) REFERENCES `dd_users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `dd_posts` DROP FOREIGN KEY `FK_6b17325aa9c9f7e10560ede7a7a`");
        await queryRunner.query("DROP INDEX `IDX_dbf3e97d02e4341c5d0b790fab` ON `dd_posts`");
        await queryRunner.query("DROP TABLE `dd_posts`");
        await queryRunner.query("DROP INDEX `IDX_d2382dee879fcb1607e04fc195` ON `dd_users`");
        await queryRunner.query("DROP INDEX `IDX_d2cd9335366d7fd1c905f7a1f9` ON `dd_users`");
        await queryRunner.query("DROP TABLE `dd_users`");
    }

}
