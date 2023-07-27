-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: biz_world
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('fb6f94dc-d0f2-4239-a799-c813a1a3a9e7','88f6265878d55adb794efa838af42bc7f44865d934cb011a934ba1b38a5b0c01','2023-06-09 05:37:06.840','20230609053706_test',NULL,NULL,'2023-06-09 05:37:06.308',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_role` varchar(45) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_login` varchar(60) NOT NULL,
  `admin_password` varchar(60) NOT NULL,
  `account_no` varchar(60) DEFAULT NULL,
  `phone_no` varchar(60) DEFAULT NULL,
  `customer_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_login_UNIQUE` (`admin_login`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Super','Admin','admin@gmail.com','admin123','123412341234','12341234',NULL),(2,'sAdminS','Faizan Rao','faizan@gmail.com','1234','123123123','12312312','1'),(3,'sAdminS','faisal','faisal@gmail.com','faisal123','123123123','12312312','5'),(17,'sAdminS','noor','noor@gmail.com','noor123',NULL,NULL,NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `bill_card` varchar(45) NOT NULL,
  `bill_date` date NOT NULL,
  `bill_card_no` varchar(16) NOT NULL,
  `delivery_date` date NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `fk_billing_customers1_idx` (`customer_id`),
  CONSTRAINT `fk_billing_customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (41,'Master','2023-06-09','1234123412341234','2023-06-09',3),(42,'Master','2023-06-09','1234123412341234','2023-06-09',3),(70,'Master','2023-06-11','1234123412341234','2023-06-11',1),(71,'Master','2023-06-11','1234123412341234','2023-06-11',1),(72,'Master','2023-06-11','1234123412341234','2023-06-11',1),(73,'Visa','2023-06-11','1234123412341234','2023-06-11',1),(74,'Master','2023-06-11','1234123412341234','2023-06-11',1),(75,'Master','2023-06-11','1234123412341234','2023-06-11',1),(76,'Visa','2023-06-11','1234123412341234','2023-06-11',1),(77,'Master','2023-06-11','1234123412341234','2023-06-11',1),(78,'Master','2023-06-15','1234123412341234','2023-06-15',1),(79,'Master','2023-06-15','1234123412341234','2023-06-15',3),(80,'Master','2023-06-15','1234123412341234','2023-06-15',3),(81,'Master','2023-06-15','1234123412341234','2023-06-15',3),(82,'Master','2023-06-15','1234123412341234','2023-06-15',3),(83,'Master','2023-06-15','1234123412341234','2023-06-15',3),(84,'Master','2023-06-15','1234123412341234','2023-06-15',3),(85,'Master','2023-06-15','1234123412341234','2023-06-15',3),(86,'Master','2023-06-15','1234123412341234','2023-06-15',3),(87,'Master','2023-06-15','1234123412341234','2023-06-15',3),(88,'Master','2023-06-15','1234123412341234','2023-06-15',3),(89,'Master','2023-06-17','1234123412341234','2023-06-17',1),(90,'Master','2023-06-17','1234123412341234','2023-06-17',1),(91,'Master','2023-06-17','1234123412341234','2023-06-17',1),(92,'Master','2023-06-17','1234123412341234','2023-06-17',1),(93,'Master','2023-06-17','1234123412341234','2023-06-17',1),(94,'Master','2023-06-18','1111222233334444','2023-06-18',1),(95,'Master','2023-06-18','1234123412341234','2023-06-18',1),(96,'Master','2023-06-19','1234123412341234','2023-06-19',1),(97,'Master','2023-06-19','1234123412341234','2023-06-19',1),(98,'Master','2023-06-19','1234123412341234','2023-06-19',5),(99,'Master','2023-06-19','1234123412341234','2023-06-19',1),(100,'Visa','2023-06-20','1234123412341234','2023-06-20',1),(101,'Master','2023-06-20','1234123412341234','2023-06-20',1),(102,'Master','2023-07-03','1234123412341234','2023-07-03',1),(103,'Master','2023-07-03','1234123412341234','2023-07-03',1),(104,'Master','2023-07-17','1234123412341234','2023-07-17',1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancellations`
--

DROP TABLE IF EXISTS `cancellations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancellations` (
  `cancellation_id` int NOT NULL AUTO_INCREMENT,
  `cancellation_date` date DEFAULT NULL,
  `cancellation_amount` float DEFAULT NULL,
  `purchase_id` int NOT NULL,
  PRIMARY KEY (`cancellation_id`),
  KEY `fk_cancellations_purchase_record1_idx` (`purchase_id`),
  CONSTRAINT `fk_cancellations_purchase_record1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_record` (`purchase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancellations`
--

LOCK TABLES `cancellations` WRITE;
/*!40000 ALTER TABLE `cancellations` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancellations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_title` varchar(70) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Home Appliances'),(2,'Kitchen Appliances'),(3,'Electronics'),(4,'Mobiles & Accessories');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `customer_login` varchar(60) NOT NULL,
  `customer_password` varchar(60) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_login_UNIQUE` (`customer_login`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Faizan Rao','faizan@gmail.com','1234'),(2,'kamran','kamran@gmail.com','kamran123'),(3,'noor','noor@gmail.com','noor123'),(4,'alex','alex@gmail.com','alex123'),(5,'faisal','faisal@gmail.com','faisal123'),(6,'ali1','ali1@gmail.com','ali123'),(7,'work','working@gmail.com','123123');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  `feedback_comment` text,
  `feedback_rating` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`product_id`),
  KEY `fk_customers_has_products_customers1_idx` (`customer_id`),
  KEY `fk_feedback_products1_idx` (`product_id`),
  CONSTRAINT `fk_customers_has_products_customers1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,NULL,5),(1,2,NULL,5),(1,6,NULL,3),(2,2,'This Product is Very Useful',4),(4,1,'This Product is Very Useful',3);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `feedbackview`
--

DROP TABLE IF EXISTS `feedbackview`;
/*!50001 DROP VIEW IF EXISTS `feedbackview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `feedbackview` AS SELECT 
 1 AS `customer_id`,
 1 AS `customer_name`,
 1 AS `feedback_comment`,
 1 AS `feedback_rating`,
 1 AS `product_title`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `manages`
--

DROP TABLE IF EXISTS `manages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manages` (
  `store_id` int NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`store_id`,`admin_id`),
  KEY `fk_admins_has_stores_stores1_idx` (`store_id`),
  KEY `fk_manages_admins1_idx` (`admin_id`),
  CONSTRAINT `fk_admins_has_stores_stores1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_manages_admins1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manages`
--

LOCK TABLES `manages` WRITE;
/*!40000 ALTER TABLE `manages` DISABLE KEYS */;
INSERT INTO `manages` VALUES (1,2),(2,3),(25,17);
/*!40000 ALTER TABLE `manages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `managesview`
--

DROP TABLE IF EXISTS `managesview`;
/*!50001 DROP VIEW IF EXISTS `managesview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `managesview` AS SELECT 
 1 AS `admin_id`,
 1 AS `admin_role`,
 1 AS `admin_login`,
 1 AS `admin_name`,
 1 AS `account_no`,
 1 AS `customer_id`,
 1 AS `phone_no`,
 1 AS `store_id`,
 1 AS `store_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_title` varchar(150) NOT NULL,
  `product_desc` text NOT NULL,
  `product_price` float NOT NULL,
  `product_warranty` varchar(45) DEFAULT NULL,
  `product_stock_status` tinyint NOT NULL,
  `product_image` text,
  `product_discount` int DEFAULT '0',
  `product_qty` int DEFAULT '1',
  `subcategory_id` int NOT NULL,
  `store_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_products_subcategory1_idx` (`subcategory_id`),
  FULLTEXT KEY `product_title` (`product_title`),
  CONSTRAINT `fk_products_subcategory1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Samsung TV','This is very good Product',300,'1 year',10,'1686819689583_samsungOLED.jpg',0,NULL,1,1),(2,'Sony TV','This is Product description new',300,'1 year',10,'1686819257884_samsungOLED.jpg',0,NULL,1,1),(3,'PEL Refrigerator','This is Very good Product',300,'1 year',10,'1686820275543_frig.jpeg',0,NULL,2,1),(4,'Sony Refrigerator','This is very good Product',300,'1 year',10,'1686820404823_frig.jpeg',0,NULL,2,1),(5,'Samsung Juicer','This is very good Product',300,'1 year',10,'1686820529542_juicer.jpg',0,NULL,3,1),(6,'Sony Juicer','This is very good Product',300,'1 year',10,'1686820544761_juicer.jpg',0,NULL,3,1),(7,'Samsung Blender','This is very good Product',300,'1 year',10,'1686849619152_juicer.jpg',0,NULL,4,1),(8,'Sony Blender','This is very good Product',300,'1 year',10,'1686849622824_juicer.jpg',0,NULL,4,1),(9,'Samsung Desktop','This is very good Product',300,'1 year',10,'1686849379620_desktop.jpeg',0,NULL,5,2),(10,'Sony Desktop','This is very good Product',300,'1 year',10,'1686849383779_desktop.jpeg',0,NULL,5,2),(11,'Samsung Laptop','This is very good Product',300,'1 year',10,'1686849454771_laptop.jpeg',0,NULL,6,2),(12,'Sony Laptop','This is very good Product',300,'1 year',10,'1686849446201_laptop.jpeg',0,NULL,6,2),(13,'IPhone','This is very good Product',300,'1 year',10,'1686849480416_download (1).jpeg',0,NULL,7,2),(14,'Samsung Smartphone','This is very good Product',300,'1 year',10,'1686849484954_download (1).jpeg',0,NULL,7,2),(15,'IPad','This is very good Product',300,'1 year',10,'1686849502158_download.jpeg',0,NULL,8,2),(16,'Samsung Tabs','This is very good Product',300,'1 year',10,'1686849505504_download.jpeg',0,NULL,8,2),(17,'Samsung Tabs','This is very good Product',100,'1 year',10,'1686849508902_download.jpeg',0,1,8,2),(18,'Samsung Tabs','This is very good Product',200,'1 year',10,'1686849513377_download.jpeg',0,1,8,2),(27,'Samsung OLED','Very Good Product ',400,'1 year',10,'1686818411481_samsungOLED.jpg',0,1,1,1),(29,'asdfadsfa','Product des',123,'123',123,'1689608384846_Project ERD.png',10,1,1,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_record`
--

DROP TABLE IF EXISTS `purchase_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_record` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `purchase_title` text NOT NULL,
  `purchase_quantity` int NOT NULL,
  `purchase_type` varchar(45) NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_amount` float NOT NULL,
  `discount` int DEFAULT NULL,
  `purchase_status` varchar(45) NOT NULL,
  `product_id` int DEFAULT NULL,
  `bill_id` int NOT NULL,
  `store_id` int DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `fk_purchase_record_billing1_idx` (`bill_id`),
  CONSTRAINT `fk_purchase_record_billing1` FOREIGN KEY (`bill_id`) REFERENCES `billing` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_record`
--

LOCK TABLES `purchase_record` WRITE;
/*!40000 ALTER TABLE `purchase_record` DISABLE KEYS */;
INSERT INTO `purchase_record` VALUES (112,'Purchased Store',1,'store','2023-06-15',300,NULL,'dispatched',NULL,88,0),(113,'Sony TV',4,'product','2023-06-17',840,NULL,'dispatched',2,89,1),(117,'Sony TV',2,'product','2023-06-17',420,NULL,'dispatched',2,91,1),(118,'Samsung OLED',3,'product','2023-06-17',840,NULL,'dispatched',27,91,1),(121,'Sony TV',1,'product','2023-06-17',210,NULL,'dispatched',2,93,1),(122,'Samsung OLED',1,'product','2023-06-17',280,NULL,'dispatched',27,93,1),(123,'Samsung OLED',1,'product','2023-06-18',280,NULL,'dispatched',27,94,1),(126,'Sony Juicer',2,'product','2023-06-18',420,NULL,'dispatched',6,95,1),(127,'Sony TV',3,'product','2023-06-18',630,NULL,'dispatched',2,95,1),(137,'Sony TV',4,'product','2023-06-20',840,NULL,'dispatched',2,101,1),(139,'Sony TV',1,'product','2023-07-03',210,NULL,'dispatched',2,103,1),(140,'asdfadsfa',2,'product','2023-07-17',154.98,NULL,'full-filled',29,104,1);
/*!40000 ALTER TABLE `purchase_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `revenue_view`
--

DROP TABLE IF EXISTS `revenue_view`;
/*!50001 DROP VIEW IF EXISTS `revenue_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `revenue_view` AS SELECT 
 1 AS `sum(purchase_amount)`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `store_name` varchar(100) NOT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Faizan Store'),(2,'Faisal Store'),(25,'Noor Store');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `stores_category`
--

DROP TABLE IF EXISTS `stores_category`;
/*!50001 DROP VIEW IF EXISTS `stores_category`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `stores_category` AS SELECT 
 1 AS `category_id`,
 1 AS `store_id`,
 1 AS `store_name`,
 1 AS `category_title`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `stores_has_categories`
--

DROP TABLE IF EXISTS `stores_has_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores_has_categories` (
  `store_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`store_id`,`category_id`),
  KEY `fk_stores_has_categories_categories1_idx` (`category_id`) /*!80000 INVISIBLE */,
  KEY `fk_stores_has_categories_stores1_idx` (`store_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_stores_has_categories_categories1_idx` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_stores_has_categories_stores1_idx` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores_has_categories`
--

LOCK TABLES `stores_has_categories` WRITE;
/*!40000 ALTER TABLE `stores_has_categories` DISABLE KEYS */;
INSERT INTO `stores_has_categories` VALUES (1,1),(1,2),(2,3),(2,4);
/*!40000 ALTER TABLE `stores_has_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `subcategory_title` varchar(70) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  KEY `fk_subcategory_categories1_idx` (`category_id`),
  CONSTRAINT `fk_subcategory_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'TV',1),(2,'Refrigerator',1),(3,'Juicer',2),(4,'Blender',2),(5,'Desktop',3),(6,'Laptop',3),(7,'Smartphone',4),(8,'Tablet',4);
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `feedbackview`
--

/*!50001 DROP VIEW IF EXISTS `feedbackview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `feedbackview` AS select `customers`.`customer_id` AS `customer_id`,`customers`.`customer_name` AS `customer_name`,`feedback`.`feedback_comment` AS `feedback_comment`,`feedback`.`feedback_rating` AS `feedback_rating`,`products`.`product_title` AS `product_title` from ((`customers` join `feedback` on((`customers`.`customer_id` = `feedback`.`customer_id`))) join `products` on((`feedback`.`product_id` = `products`.`product_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `managesview`
--

/*!50001 DROP VIEW IF EXISTS `managesview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `managesview` AS select `admins`.`admin_id` AS `admin_id`,`admins`.`admin_role` AS `admin_role`,`admins`.`admin_login` AS `admin_login`,`admins`.`admin_name` AS `admin_name`,`admins`.`account_no` AS `account_no`,`admins`.`customer_id` AS `customer_id`,`admins`.`phone_no` AS `phone_no`,`manages`.`store_id` AS `store_id`,`stores`.`store_name` AS `store_name` from ((`admins` join `manages` on((`admins`.`admin_id` = `manages`.`admin_id`))) join `stores` on((`manages`.`store_id` = `stores`.`store_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `revenue_view`
--

/*!50001 DROP VIEW IF EXISTS `revenue_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `revenue_view` AS select sum(`purchase_record`.`purchase_amount`) AS `sum(purchase_amount)` from `purchase_record` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `stores_category`
--

/*!50001 DROP VIEW IF EXISTS `stores_category`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `stores_category` AS select `stores_has_categories`.`category_id` AS `category_id`,`stores`.`store_id` AS `store_id`,`stores`.`store_name` AS `store_name`,`categories`.`category_title` AS `category_title` from ((`stores` join `stores_has_categories` on((`stores`.`store_id` = `stores_has_categories`.`store_id`))) join `categories` on((`stores_has_categories`.`category_id` = `categories`.`category_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-27  7:25:09
