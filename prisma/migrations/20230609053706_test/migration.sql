-- CreateTable
CREATE TABLE `admins` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_role` VARCHAR(45) NOT NULL,
    `admin_name` VARCHAR(100) NOT NULL,
    `admin_login` VARCHAR(60) NOT NULL,
    `admin_password` VARCHAR(60) NOT NULL,
    `account_no` VARCHAR(60) NULL,
    `phone_no` VARCHAR(60) NULL,
    `customer_id` VARCHAR(45) NULL,

    UNIQUE INDEX `admin_login_UNIQUE`(`admin_login`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billing` (
    `bill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bill_card` VARCHAR(45) NOT NULL,
    `bill_date` DATETIME(3) NOT NULL,
    `bill_card_no` VARCHAR(16) NOT NULL,
    `delivery_date` DATETIME(3) NOT NULL,
    `customer_id` INTEGER NOT NULL,

    INDEX `fk_billing_customers1_idx`(`customer_id`),
    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancellations` (
    `cancellation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cancellation_date` DATETIME(3) NULL,
    `cancellation_amount` FLOAT NULL,
    `purchase_id` INTEGER NOT NULL,

    INDEX `fk_cancellations_purchase_record1_idx`(`purchase_id`),
    PRIMARY KEY (`cancellation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_title` VARCHAR(70) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(100) NOT NULL,
    `customer_login` VARCHAR(60) NOT NULL,
    `customer_password` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `customer_login_UNIQUE`(`customer_login`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `customer_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `feedback_comment` TEXT NULL,
    `feedback_rating` INTEGER NULL,

    INDEX `fk_customers_has_products_customers1_idx`(`customer_id`),
    INDEX `fk_feedback_products1_idx`(`product_id`),
    PRIMARY KEY (`customer_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manages` (
    `store_id` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,

    INDEX `fk_admins_has_stores_stores1_idx`(`store_id`),
    INDEX `fk_manages_admins1_idx`(`admin_id`),
    PRIMARY KEY (`store_id`, `admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_title` VARCHAR(150) NOT NULL,
    `product_desc` TEXT NOT NULL,
    `product_price` FLOAT NOT NULL,
    `product_warranty` VARCHAR(45) NULL,
    `product_stock_status` TINYINT NOT NULL,
    `product_image` TEXT NULL,
    `subcategory_id` INTEGER NOT NULL,
    `product_qty` INTEGER NULL DEFAULT 1,

    INDEX `fk_products_subcategory1_idx`(`subcategory_id`),
    INDEX `product_title`(`product_title`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_record` (
    `purchase_id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchase_title` TEXT NOT NULL,
    `purchase_quantity` INTEGER NOT NULL,
    `purchase_type` VARCHAR(45) NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,
    `purchase_amount` FLOAT NOT NULL,
    `discount` INTEGER NULL,
    `purchase_status` VARCHAR(45) NOT NULL,
    `product_id` INTEGER NULL,
    `bill_id` INTEGER NOT NULL,

    INDEX `fk_purchase_record_billing1_idx`(`bill_id`),
    PRIMARY KEY (`purchase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores` (
    `store_id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stores_has_categories` (
    `store_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `fk_stores_has_categories_categories1_idx`(`category_id`),
    INDEX `fk_stores_has_categories_stores1_idx`(`store_id`),
    PRIMARY KEY (`store_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategory` (
    `subcategory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subcategory_title` VARCHAR(70) NOT NULL,
    `category_id` INTEGER NOT NULL,

    INDEX `fk_subcategory_categories1_idx`(`category_id`),
    PRIMARY KEY (`subcategory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `billing` ADD CONSTRAINT `fk_billing_customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cancellations` ADD CONSTRAINT `fk_cancellations_purchase_record1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_record`(`purchase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `fk_customers_has_products_customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `fk_feedback_products1` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `manages` ADD CONSTRAINT `fk_admins_has_stores_stores1` FOREIGN KEY (`store_id`) REFERENCES `stores`(`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manages` ADD CONSTRAINT `fk_manages_admins1` FOREIGN KEY (`admin_id`) REFERENCES `admins`(`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `fk_products_subcategory1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`subcategory_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `purchase_record` ADD CONSTRAINT `fk_purchase_record_billing1` FOREIGN KEY (`bill_id`) REFERENCES `billing`(`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stores_has_categories` ADD CONSTRAINT `fk_stores_has_categories_categories1_idx` FOREIGN KEY (`store_id`) REFERENCES `stores`(`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stores_has_categories` ADD CONSTRAINT `fk_stores_has_categories_stores1_idx` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategory` ADD CONSTRAINT `fk_subcategory_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
