import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1609151593755 implements MigrationInterface {
    name = 'Users1609151593755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orders` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `userId` int UNSIGNED NOT NULL, `price` int UNSIGNED NOT NULL, `payMethod` tinyint UNSIGNED NOT NULL, `status` tinyint UNSIGNED NOT NULL, `isPaid` tinyint NOT NULL, `products` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `posts` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `userId` int UNSIGNED NOT NULL, `tite` varchar(150) NOT NULL, `content` text NOT NULL, `img` varchar(200) NOT NULL, `slug` varchar(150) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `name` varchar(150) NOT NULL, `email` varchar(150) NOT NULL, `password` varchar(200) NOT NULL, `role` enum ('ADMIN', 'EDITOR', 'MODERNATOR', 'COSTUMER', 'READER') NOT NULL, `emailActivated` tinyint NOT NULL DEFAULT 0, `smsActivated` tinyint NOT NULL DEFAULT 0, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `address` (`id` int UNSIGNED NOT NULL AUTO_INCREMENT, `userId` int UNSIGNED NOT NULL, `tite` varchar(150) NOT NULL, `ilce` smallint UNSIGNED NOT NULL, `tc` varchar(11) NOT NULL, `phone` varchar(11) NOT NULL, `address` text NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `posts` ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `address` ADD CONSTRAINT `FK_d25f1ea79e282cc8a42bd616aa3` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `address` DROP FOREIGN KEY `FK_d25f1ea79e282cc8a42bd616aa3`");
        await queryRunner.query("ALTER TABLE `posts` DROP FOREIGN KEY `FK_ae05faaa55c866130abef6e1fee`");
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_151b79a83ba240b0cb31b2302d1`");
        await queryRunner.query("DROP TABLE `address`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `posts`");
        await queryRunner.query("DROP TABLE `orders`");
    }

}
