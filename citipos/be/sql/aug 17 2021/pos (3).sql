-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 17, 2021 at 06:28 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_roles`
--

CREATE TABLE `accounts_roles` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `role` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts_roles`
--

INSERT INTO `accounts_roles` (`id`, `employee_id`, `role`, `active`, `date_updated`, `date_created`) VALUES
(4, 9, 'Inventory', 0, '2021-04-25 20:29:14', '2021-04-25 20:18:12'),
(6, 9, 'Cashier', 0, '2021-04-25 20:28:47', '2021-04-25 20:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `time_in` timestamp NULL DEFAULT NULL,
  `time_out` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `employee_id`, `time_in`, `time_out`, `date_updated`, `date_created`) VALUES
(1, 7, '2021-08-17 05:18:15', NULL, '2021-08-17 09:37:47', '2021-08-17 07:34:39'),
(2, 5, '2021-08-16 16:00:05', NULL, '2021-08-17 09:40:24', '2021-08-17 09:40:24'),
(3, 5, '2021-08-16 16:05:05', NULL, '2021-08-17 09:40:58', '2021-08-17 09:40:58'),
(4, 5, '2021-08-16 16:05:05', NULL, '2021-08-17 09:41:00', '2021-08-17 09:41:00'),
(5, 5, '2021-08-16 16:00:17', NULL, '2021-08-17 09:42:17', '2021-08-17 09:42:17'),
(6, 5, '2021-08-16 16:00:17', NULL, '2021-08-17 09:42:42', '2021-08-17 09:42:42'),
(7, 5, '2021-08-16 16:20:21', NULL, '2021-08-17 09:42:58', '2021-08-17 09:42:58'),
(8, 5, '2021-08-16 16:20:21', NULL, '2021-08-17 09:43:58', '2021-08-17 09:43:58'),
(9, 5, '2021-08-17 09:45:35', NULL, '2021-08-17 09:45:35', '2021-08-17 09:45:35'),
(10, 1, '2021-08-17 09:55:39', '2021-08-17 09:57:03', '2021-08-17 09:57:03', '2021-08-17 09:55:39'),
(11, 1, '2021-08-17 09:59:13', '2021-08-17 09:59:37', '2021-08-17 09:59:37', '2021-08-17 09:59:13'),
(12, 3, '2021-08-17 12:28:49', NULL, '2021-08-17 12:28:49', '2021-08-17 12:28:49'),
(13, 5, '2021-08-17 14:52:29', '2021-08-17 16:00:05', '2021-08-17 16:00:05', '2021-08-17 14:52:29'),
(14, 1, '2021-08-17 15:15:42', '2021-08-17 15:18:06', '2021-08-17 15:18:06', '2021-08-17 15:15:42'),
(15, 1, '2021-08-17 09:18:31', '2021-08-17 15:18:46', '2021-08-17 15:18:46', '2021-08-17 15:18:31'),
(16, 1, '2021-08-17 01:20:25', '2021-08-17 15:20:39', '2021-08-17 15:20:39', '2021-08-17 15:20:25'),
(17, 1, '2021-08-16 23:24:12', '2021-08-17 15:24:30', '2021-08-17 15:24:30', '2021-08-17 15:24:12'),
(18, 1, '2021-08-17 03:24:58', '2021-08-17 15:25:11', '2021-08-17 15:25:11', '2021-08-17 15:24:58'),
(19, 1, '2021-08-17 15:38:40', '2021-08-17 15:38:49', '2021-08-17 15:38:49', '2021-08-17 15:38:40'),
(20, 1, '2021-08-16 16:39:03', '2021-08-17 15:50:48', '2021-08-17 15:50:48', '2021-08-17 15:39:03'),
(22, 1, '2021-08-17 15:51:06', '2021-08-17 15:51:15', '2021-08-17 15:51:15', '2021-08-17 15:51:06'),
(23, 1, '2021-08-16 20:51:32', '2021-08-17 15:52:07', '2021-08-17 15:52:07', '2021-08-17 15:51:32'),
(24, 1, '2021-08-16 19:54:15', '2021-08-17 15:54:40', '2021-08-17 15:54:40', '2021-08-17 15:54:15'),
(25, 1, '2021-08-17 15:54:52', NULL, '2021-08-17 15:54:52', '2021-08-17 15:54:52'),
(26, 1, '2021-08-17 15:55:36', '2021-08-17 15:55:43', '2021-08-17 15:55:43', '2021-08-17 15:55:36'),
(27, 1, '2021-08-17 15:59:55', '2021-08-17 16:00:20', '2021-08-17 16:00:20', '2021-08-17 15:59:55'),
(28, 1, '2021-08-17 16:09:46', NULL, '2021-08-17 16:09:46', '2021-08-17 16:09:46'),
(29, 1, '2021-08-17 16:10:37', '2021-08-17 16:17:08', '2021-08-17 16:17:08', '2021-08-17 16:10:37'),
(30, 1, '2021-08-16 16:17:22', '2021-08-17 16:17:35', '2021-08-17 16:18:22', '2021-08-17 16:17:22'),
(31, 1, '2021-08-17 16:18:36', '2021-08-17 16:18:57', '2021-08-17 16:18:57', '2021-08-17 16:18:36'),
(32, 1, '2021-08-17 16:22:47', '2021-08-17 16:22:55', '2021-08-17 16:22:55', '2021-08-17 16:22:47');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `business_id`, `category`, `date_updated`, `date_created`) VALUES
(1, 1, '500', '2021-04-22 09:42:13', '2021-04-22 09:42:13'),
(2, 0, '66778', '2021-07-29 04:28:30', '2021-07-29 04:28:30'),
(3, 0, 'kimay', '2021-08-03 05:27:59', '2021-08-03 05:27:59');

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`id`, `owner_id`, `username`, `password`, `date_created`, `date_updated`) VALUES
(1, 8, '345', 'sam', '2021-04-21 18:42:07', '2021-04-20 15:13:03');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `fname` varchar(40) NOT NULL,
  `lname` varchar(40) NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `shop_id`, `fname`, `lname`, `address`, `contact`, `gender`, `active`, `date_updated`, `date_created`) VALUES
(1, 1, 'awdawd', 'awd', 'awd', 'awd', '0', 1, '2021-04-25 18:56:28', '2021-04-19 17:50:15'),
(2, 1, 'awdawd', 'awd', 'awd', 'awd', 'awd', 1, '2021-04-25 18:56:28', '2021-04-19 17:50:46'),
(3, 1, 'awdawd', 'awd', 'awd', 'awd', 'awd', 1, '2021-04-25 18:56:28', '2021-04-19 17:50:59'),
(4, 1, 'awdawd', 'awd', 'awd', 'awd', 'female', 1, '2021-04-25 18:56:28', '2021-04-19 17:51:14'),
(5, 1, 'awdaw', 'dawda', 'dawda', 'awdawd', 'male', 1, '2021-04-25 18:56:28', '2021-04-19 17:53:06'),
(6, 1, 'awdawd', 'wdawd', 'wdawd', 'awdaw', 'female', 1, '2021-04-25 18:56:28', '2021-04-19 17:53:34'),
(7, 1, 'awdaw', 'dawd', 'dawd', 'awd', 'male', 0, '2021-04-25 18:57:00', '2021-04-19 17:54:03'),
(8, 1, 'dawd', 'awdaw', 'awdaw', 'awdawd', 'male', 1, '2021-04-25 18:56:28', '2021-04-19 17:55:46'),
(9, 1, 'awdawd', 'awd', 'awd', 'awd', 'female', 1, '2021-04-25 18:56:28', '2021-04-19 17:56:10');

-- --------------------------------------------------------

--
-- Table structure for table `employee_acounts`
--

CREATE TABLE `employee_acounts` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_acounts`
--

INSERT INTO `employee_acounts` (`id`, `employee_id`, `username`, `password`, `active`, `date_updated`, `date_created`) VALUES
(1, 9, 'awdawda', 'wdawd', 1, '2021-04-25 19:29:11', '2021-04-25 19:29:11'),
(2, 9, 'awdawd', 'awdawdwad', 1, '2021-04-25 20:08:57', '2021-04-25 20:08:57'),
(3, 9, 'awdawd', 'awdawdwad', 1, '2021-04-25 20:09:28', '2021-04-25 20:09:28'),
(4, 9, 'awdawd', 'awda', 1, '2021-04-25 20:09:34', '2021-04-25 20:09:34'),
(5, 9, 'awdawd', 'awdaw', 1, '2021-04-25 20:09:54', '2021-04-25 20:09:54'),
(6, 9, 'awdawd', 'awdaw', 1, '2021-04-25 20:10:10', '2021-04-25 20:10:10'),
(7, 9, 'dawd', 'awdaw', 1, '2021-04-25 20:17:22', '2021-04-25 20:17:22'),
(8, 9, 'awdawd', 'awdawd', 1, '2021-04-25 20:18:12', '2021-04-25 20:18:12'),
(9, 9, 'awdaw', 'dawd', 1, '2021-04-25 20:19:12', '2021-04-25 20:19:12'),
(10, 9, '123', '123', 1, '2021-06-26 05:08:15', '2021-04-25 20:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `id` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(20) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id`, `fname`, `lname`, `address`, `contact`, `gender`, `date_updated`, `date_created`) VALUES
(1, 'awdawdawd', 'awdaw', 'dawd', 'wadawdawd', 'male', '2021-04-20 11:25:50', '2021-04-20 11:25:50'),
(2, '798798', '987987', '987987', '978987', 'male', '2021-04-20 11:27:39', '2021-04-20 11:27:39'),
(3, '8779987', '987987', '987987', '87987', 'female', '2021-04-20 11:28:05', '2021-04-20 11:28:05'),
(4, 'awdawd', 'awdawd', 'awdawd', 'awdaw', 'female', '2021-04-20 11:28:32', '2021-04-20 11:28:32'),
(5, 'dawd', 'awdawd', '546456', '456456', 'male', '2021-04-20 15:08:08', '2021-04-20 15:08:08'),
(6, 'dawd', 'awdawd', '546456', '456456', 'male', '2021-04-20 15:08:08', '2021-04-20 15:08:08'),
(7, 'dawd', 'awdawd', '546456', '456456', 'male', '2021-04-20 15:09:39', '2021-04-20 15:09:39'),
(8, '32453453', '45345345', '345435', '345', 'male', '2021-04-20 15:13:03', '2021-04-20 15:13:03');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `category` varchar(25) NOT NULL,
  `description` text DEFAULT NULL,
  `barcode` varchar(40) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `category`, `description`, `barcode`, `date_updated`, `date_created`) VALUES
(1, 'awdawd', '1', NULL, '65456', '2021-04-22 16:03:37', '2021-04-22 16:03:37'),
(2, 'awdwa', '1', NULL, 'awdaw', '2021-04-22 16:06:09', '2021-04-22 16:06:09'),
(3, 'awdwa', '1', NULL, 'awdaw', '2021-04-22 16:06:42', '2021-04-22 16:06:42'),
(4, 'awdwa', '1', NULL, 'awdaw', '2021-04-22 16:09:00', '2021-04-22 16:09:00'),
(5, 'awdawd', '1', NULL, 'saefsef', '2021-04-22 16:16:16', '2021-04-22 16:16:16'),
(6, 'dawd', '1', NULL, '56456', '2021-04-22 16:17:14', '2021-04-22 16:17:14'),
(7, 'awdawd', '1', NULL, '6456', '2021-04-22 16:17:59', '2021-04-22 16:17:59'),
(8, 'awdawd', '1', NULL, '6456', '2021-04-22 16:18:24', '2021-04-22 16:18:24'),
(9, 'dawda', '1', NULL, 'awdaw', '2021-04-22 16:20:20', '2021-04-22 16:20:20'),
(10, '345345', '1', NULL, '5454', '2021-04-22 16:20:36', '2021-04-22 16:20:36'),
(11, '987987', '1', NULL, '798987', '2021-04-23 18:04:27', '2021-04-23 18:04:27'),
(12, 'awdawd', '1', NULL, '345345', '2021-04-23 18:12:15', '2021-04-23 18:12:15'),
(13, 'awdawd', '1', NULL, '345345', '2021-04-23 18:12:41', '2021-04-23 18:12:41'),
(14, 'awdawd', '1', NULL, '345345', '2021-04-23 18:13:05', '2021-04-23 18:13:05'),
(15, 'cellphones', '1', NULL, '9879898', '2021-04-24 16:43:41', '2021-04-24 16:43:41'),
(16, 'efcseesg', '1', NULL, '34254', '2021-06-29 13:44:50', '2021-06-29 13:44:50'),
(17, 'hagfug', '1', NULL, 'jiuyiatyi', '2021-06-30 08:12:54', '2021-06-30 08:12:54'),
(18, 'htrtre', '1', NULL, 'gfhgf', '2021-06-30 08:18:17', '2021-06-30 08:18:17'),
(19, 'awdad', '1', NULL, 'afag', '2021-07-04 06:32:00', '2021-07-04 06:32:00'),
(20, 'dawdaf', '1', NULL, 'segs', '2021-07-16 16:36:18', '2021-07-16 16:36:18'),
(21, 'sample', '1', NULL, '4532', '2021-07-29 02:10:26', '2021-07-29 02:10:26'),
(22, 'kjfhskdrhg', '1', NULL, '45345', '2021-07-29 03:52:49', '2021-07-29 03:52:49'),
(23, 'fsrgsrg', '1', NULL, '353rgrg', '2021-07-29 03:55:40', '2021-07-29 03:55:40'),
(24, 'rglkndrlg', '1', NULL, 'tetgrgh', '2021-07-29 04:01:32', '2021-07-29 04:01:32'),
(25, 'sghsghk', '1', NULL, 'srljhskrg', '2021-07-29 04:02:55', '2021-07-29 04:02:55'),
(26, 'srsg', '1', NULL, 'efsfgse', '2021-07-29 04:03:56', '2021-07-29 04:03:56'),
(27, '65746', '2', NULL, 'jhjgvjhvj', '2021-07-29 04:41:29', '2021-07-29 04:41:29'),
(28, '65746', '2', NULL, 'jhjgvjhvj', '2021-07-29 04:43:07', '2021-07-29 04:43:07'),
(29, '65746', '2', NULL, 'jhjgvjhvj', '2021-07-29 04:43:42', '2021-07-29 04:43:42'),
(30, '65746', '2', NULL, 'jhjgvjhvj', '2021-07-29 04:49:14', '2021-07-29 04:49:14'),
(31, 'sample', '2', NULL, 'yeah', '2021-07-29 04:57:53', '2021-07-29 04:57:53'),
(32, '254534', '2', NULL, '564574', '2021-07-30 11:15:27', '2021-07-30 11:15:27'),
(33, '347956387', '2', NULL, 'jfghkja', '2021-08-02 15:55:13', '2021-07-30 11:15:53'),
(34, '35646', '2', NULL, '46dfhdth', '2021-07-30 11:16:09', '2021-07-30 11:16:09'),
(35, 'hgjfhgf', '3', 'vvvjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfyt', 'kjhgfh', '2021-08-03 05:41:28', '2021-08-03 05:41:28'),
(36, 'hgjfhgf', '3', 'vvvjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfyt', 'kjhgfh', '2021-08-03 05:41:39', '2021-08-03 05:41:39'),
(37, 'hgjfhgf', '3', 'vvvjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfytjhgjht hguyfdty jhgytf khhugfyt', 'kjhgfh', '2021-08-03 05:41:55', '2021-08-03 05:41:55'),
(38, 'jvhgg', '3', 'jhgftyd', '89765', '2021-08-03 05:53:43', '2021-08-03 05:53:43'),
(39, 'sample product', '2', 'hjgjfhfhfh', '956894769847', '2021-08-15 11:52:05', '2021-08-15 11:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `products_stocks`
--

CREATE TABLE `products_stocks` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `stocks_count` int(11) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_stocks`
--

INSERT INTO `products_stocks` (`id`, `product_id`, `stocks_count`, `date_updated`, `date_created`) VALUES
(1, 4, 50, '2021-04-22 16:09:00', '2021-04-22 16:09:00'),
(2, 5, 6456, '2021-04-22 16:16:16', '2021-04-22 16:16:16'),
(3, 6, 5646, '2021-04-22 16:17:14', '2021-04-22 16:17:14'),
(4, 7, 345, '2021-04-22 16:17:59', '2021-04-22 16:17:59'),
(5, 8, 345, '2021-04-22 16:18:24', '2021-04-22 16:18:24'),
(6, 9, 45645, '2021-04-22 16:20:20', '2021-04-22 16:20:20'),
(7, 10, 55, '2021-04-22 16:20:36', '2021-04-22 16:20:36'),
(8, 11, 998798, '2021-04-23 18:04:27', '2021-04-23 18:04:27'),
(9, 12, 345345, '2021-04-23 18:12:15', '2021-04-23 18:12:15'),
(10, 13, 345345, '2021-04-23 18:12:41', '2021-04-23 18:12:41'),
(11, 14, 345345, '2021-04-23 18:13:05', '2021-04-23 18:13:05'),
(12, 15, 50, '2021-04-24 16:43:41', '2021-04-24 16:43:41'),
(13, 16, 34, '2021-06-29 13:44:50', '2021-06-29 13:44:50'),
(14, 17, 44, '2021-06-30 08:12:54', '2021-06-30 08:12:54'),
(15, 18, 4, '2021-06-30 08:18:17', '2021-06-30 08:18:17'),
(16, 19, 3, '2021-07-04 06:32:00', '2021-07-04 06:32:00'),
(17, 20, 43543, '2021-07-16 16:36:18', '2021-07-16 16:36:18'),
(18, 21, 8765, '2021-07-29 02:10:26', '2021-07-29 02:10:26'),
(19, 22, 3545, '2021-07-29 03:52:49', '2021-07-29 03:52:49'),
(20, 23, 343, '2021-07-29 03:55:40', '2021-07-29 03:55:40'),
(21, 24, 3, '2021-07-29 04:01:32', '2021-07-29 04:01:32'),
(22, 25, 34346, '2021-07-29 04:02:55', '2021-07-29 04:02:55'),
(23, 26, 654, '2021-07-29 04:03:56', '2021-07-29 04:03:56'),
(24, 27, 65645, '2021-07-29 04:41:29', '2021-07-29 04:41:29'),
(25, 28, 65645, '2021-07-29 04:43:07', '2021-07-29 04:43:07'),
(26, 29, 65645, '2021-07-29 04:43:42', '2021-07-29 04:43:42'),
(27, 30, 65645, '2021-07-29 04:49:14', '2021-07-29 04:49:14'),
(28, 31, 56, '2021-07-29 04:57:53', '2021-07-29 04:57:53'),
(29, 32, 3545, '2021-07-30 11:15:27', '2021-07-30 11:15:27'),
(30, 33, 34, '2021-07-30 11:15:53', '2021-07-30 11:15:53'),
(31, 34, 46546, '2021-07-30 11:16:09', '2021-07-30 11:16:09'),
(32, 35, 654, '2021-08-03 05:41:28', '2021-08-03 05:41:28'),
(33, 36, 654, '2021-08-03 05:41:39', '2021-08-03 05:41:39'),
(34, 37, 654, '2021-08-03 05:41:55', '2021-08-03 05:41:55'),
(35, 38, 7654, '2021-08-03 05:53:43', '2021-08-03 05:53:43'),
(36, 39, 45, '2021-08-15 11:52:05', '2021-08-15 11:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name20` text NOT NULL,
  `name50` text NOT NULL,
  `name100` text NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `name20`, `name50`, `name100`, `date_updated`, `date_created`) VALUES
(1, 12, 'gallery/20/60830dff702061619201535.jpg', 'gallery/50/60830dff6dfb11619201535.jpg', 'gallery/100/60830dff6dc6e1619201535.jpg', '2021-04-23 18:12:15', '2021-04-23 18:12:15'),
(2, 13, 'gallery/20/60830e1982de11619201561.jpg', 'gallery/50/60830e1980e651619201561.jpg', 'gallery/100/60830e1980ac21619201561.jpg', '2021-04-23 18:12:41', '2021-04-23 18:12:41'),
(3, 14, 'gallery/20/60830e314f2881619201585.jpg', 'gallery/50/60830e314cfec1619201585.jpg', 'gallery/100/60830e314cd331619201585.jpg', '2021-04-23 18:13:05', '2021-04-23 18:13:05'),
(4, 15, 'gallery/20/60844abdbd3581619282621.jpg', 'gallery/50/60844abdb8fa21619282621.jpg', 'gallery/100/60844abdb8cbc1619282621.jpg', '2021-04-24 16:43:41', '2021-04-24 16:43:41'),
(5, 30, 'gallery/20/6102334a1ae181627534154.jpg', 'gallery/50/6102334a176381627534154.jpg', 'gallery/100/6102334a1739b1627534154.jpg', '2021-07-29 04:49:14', '2021-07-29 04:49:14'),
(6, 31, 'gallery/20/610235522fe3b1627534674.jpg', 'gallery/50/61023551cff791627534673.jpg', 'gallery/100/61023551cf78e1627534673.jpg', '2021-07-29 04:57:54', '2021-07-29 04:57:54'),
(7, 32, 'gallery/20/6103df4fe08cd1627643727.jpg', 'gallery/50/6103df4f7f5af1627643727.jpg', 'gallery/100/6103df4f7ef1d1627643727.jpg', '2021-07-30 11:15:28', '2021-07-30 11:15:28'),
(8, 33, 'gallery/20/6103df69568051627643753.jpg', 'gallery/50/6103df6925cda1627643753.jpg', 'gallery/100/6103df69252ee1627643753.jpg', '2021-07-30 11:15:53', '2021-07-30 11:15:53'),
(9, 34, 'gallery/20/6103df79d754b1627643769.jpg', 'gallery/50/6103df79d04f21627643769.jpg', 'gallery/100/6103df79d01541627643769.jpg', '2021-07-30 11:16:09', '2021-07-30 11:16:09'),
(10, 37, 'gallery/20/6108d72363a811627969315.jpg', 'gallery/50/6108d7230da1c1627969315.jpg', 'gallery/100/6108d7230d3261627969315.jpg', '2021-08-03 05:41:55', '2021-08-03 05:41:55'),
(11, 38, 'gallery/20/6108d9e7622a41627970023.jpg', 'gallery/50/6108d9e72574a1627970023.jpg', 'gallery/100/6108d9e72358c1627970023.jpg', '2021-08-03 05:53:43', '2021-08-03 05:53:43'),
(12, 39, 'gallery/20/6118ffe5ace031629028325.jpg', 'gallery/50/6118ffe550de71629028325.jpg', 'gallery/100/6118ffe54fa341629028325.jpg', '2021-08-15 11:52:05', '2021-08-15 11:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `product_price`
--

CREATE TABLE `product_price` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_price`
--

INSERT INTO `product_price` (`id`, `product_id`, `price`, `date_updated`, `date_created`) VALUES
(1, 7, 0, '2021-04-22 16:17:59', '2021-04-22 16:17:59'),
(2, 8, 456, '2021-04-22 16:18:24', '2021-04-22 16:18:24'),
(3, 9, 546456, '2021-04-22 16:20:20', '2021-04-22 16:20:20'),
(4, 10, 55.65, '2021-04-22 16:20:36', '2021-04-22 16:20:36'),
(5, 11, 87987, '2021-04-23 18:04:27', '2021-04-23 18:04:27'),
(6, 12, 345345, '2021-04-23 18:12:15', '2021-04-23 18:12:15'),
(7, 13, 345345, '2021-04-23 18:12:41', '2021-04-23 18:12:41'),
(8, 14, 345345, '2021-04-23 18:13:05', '2021-04-23 18:13:05'),
(9, 15, 500, '2021-04-24 16:43:41', '2021-04-24 16:43:41'),
(10, 16, 444, '2021-06-29 13:44:50', '2021-06-29 13:44:50'),
(11, 17, 453653, '2021-06-30 08:12:54', '2021-06-30 08:12:54'),
(12, 18, 8765, '2021-06-30 08:18:17', '2021-06-30 08:18:17'),
(13, 19, 4346, '2021-07-04 06:32:00', '2021-07-04 06:32:00'),
(14, 20, 76754, '2021-07-16 16:36:18', '2021-07-16 16:36:18'),
(15, 21, 7654, '2021-07-29 02:10:26', '2021-07-29 02:10:26'),
(16, 22, 35, '2021-07-29 03:52:49', '2021-07-29 03:52:49'),
(17, 23, 3534, '2021-07-29 03:55:40', '2021-07-29 03:55:40'),
(18, 24, 98765, '2021-07-29 04:01:32', '2021-07-29 04:01:32'),
(19, 25, 7654, '2021-07-29 04:02:55', '2021-07-29 04:02:55'),
(20, 26, 78654, '2021-07-29 04:03:56', '2021-07-29 04:03:56'),
(21, 27, 5567, '2021-07-29 04:41:29', '2021-07-29 04:41:29'),
(22, 28, 5567, '2021-07-29 04:43:07', '2021-07-29 04:43:07'),
(23, 29, 5567, '2021-07-29 04:43:42', '2021-07-29 04:43:42'),
(24, 30, 5567, '2021-07-29 04:49:14', '2021-07-29 04:49:14'),
(25, 31, 500, '2021-07-29 04:57:53', '2021-07-29 04:57:53'),
(26, 32, 45646, '2021-07-30 11:15:27', '2021-07-30 11:15:27'),
(27, 33, 7654, '2021-07-30 11:15:53', '2021-07-30 11:15:53'),
(28, 34, 4556, '2021-07-30 11:16:09', '2021-07-30 11:16:09'),
(29, 35, 7654.89, '2021-08-03 05:41:28', '2021-08-03 05:41:28'),
(30, 36, 7654.89, '2021-08-03 05:41:39', '2021-08-03 05:41:39'),
(31, 37, 7654.89, '2021-08-03 05:41:55', '2021-08-03 05:41:55'),
(32, 38, 8765, '2021-08-03 05:53:43', '2021-08-03 05:53:43'),
(33, 39, 500.7, '2021-08-15 11:52:05', '2021-08-15 11:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `id` int(11) NOT NULL,
  `whole_sold_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_id` int(11) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sold`
--

INSERT INTO `sold` (`id`, `whole_sold_id`, `product_id`, `quantity`, `price_id`, `date_updated`, `date_created`) VALUES
(20, 41, 33, 1, 27, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(21, 41, 33, 1, 27, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(22, 41, 33, 1, 27, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(23, 41, 33, 1, 27, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(24, 41, 33, 1, 27, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(25, 43, 33, 1, 27, '2021-08-02 11:24:48', '2021-08-02 11:24:48'),
(26, 45, 33, 1, 27, '2021-08-02 11:25:20', '2021-08-02 11:25:20'),
(27, 45, 33, 1, 27, '2021-08-02 11:25:20', '2021-08-02 11:25:20'),
(28, 47, 33, 1, 27, '2021-08-02 11:26:04', '2021-08-02 11:26:04'),
(29, 47, 33, 1, 27, '2021-08-02 11:26:04', '2021-08-02 11:26:04'),
(30, 49, 33, 1, 27, '2021-08-02 11:26:32', '2021-08-02 11:26:32'),
(31, 49, 33, 1, 27, '2021-08-02 11:26:32', '2021-08-02 11:26:32'),
(32, 51, 33, 1, 27, '2021-08-02 11:26:52', '2021-08-02 11:26:52'),
(33, 51, 33, 1, 27, '2021-08-02 11:26:52', '2021-08-02 11:26:52'),
(34, 53, 33, 1, 27, '2021-08-02 11:27:27', '2021-08-02 11:27:27'),
(35, 53, 33, 1, 27, '2021-08-02 11:27:27', '2021-08-02 11:27:27'),
(36, 55, 33, 1, 27, '2021-08-02 15:52:24', '2021-08-02 15:52:24'),
(37, 55, 33, 1, 27, '2021-08-02 15:52:24', '2021-08-02 15:52:24'),
(38, 57, 33, 1, 27, '2021-08-02 15:52:54', '2021-08-02 15:52:54'),
(39, 57, 33, 1, 27, '2021-08-02 15:52:54', '2021-08-02 15:52:54'),
(40, 59, 33, 1, 27, '2021-08-02 15:55:24', '2021-08-02 15:55:24'),
(41, 59, 33, 1, 27, '2021-08-02 15:55:24', '2021-08-02 15:55:24'),
(42, 63, 33, 2, 27, '2021-08-02 16:07:01', '2021-08-02 16:07:01'),
(43, 63, 33, 1, 27, '2021-08-02 16:07:01', '2021-08-02 16:07:01'),
(44, 65, 33, 1, 27, '2021-08-03 04:13:07', '2021-08-03 04:13:07'),
(45, 65, 33, 1, 27, '2021-08-03 04:13:07', '2021-08-03 04:13:07'),
(46, 66, 33, 1, 27, '2021-08-03 05:17:18', '2021-08-03 05:17:18'),
(47, 66, 33, 1, 27, '2021-08-03 05:17:18', '2021-08-03 05:17:18'),
(48, 66, 33, 1, 27, '2021-08-03 05:17:18', '2021-08-03 05:17:18'),
(49, 67, 33, 1, 27, '2021-08-03 05:17:41', '2021-08-03 05:17:41'),
(50, 67, 33, 1, 27, '2021-08-03 05:17:41', '2021-08-03 05:17:41'),
(51, 67, 33, 1, 27, '2021-08-03 05:17:41', '2021-08-03 05:17:41'),
(52, 68, 37, 89, 31, '2021-08-14 01:20:50', '2021-08-14 01:20:50'),
(53, 68, 36, 9, 30, '2021-08-14 01:20:50', '2021-08-14 01:20:50'),
(54, 68, 35, 8, 29, '2021-08-14 01:20:50', '2021-08-14 01:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `whole_sold`
--

CREATE TABLE `whole_sold` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `whole_sold`
--

INSERT INTO `whole_sold` (`id`, `employee_id`, `date_updated`, `date_created`) VALUES
(14, 0, '2021-08-02 11:06:39', '2021-08-02 11:09:57'),
(16, 0, '2021-08-02 11:10:30', '2021-08-02 11:10:30'),
(17, 0, '2021-08-02 11:10:30', '2021-08-02 11:10:30'),
(18, 0, '2021-08-02 11:11:10', '2021-08-02 11:11:10'),
(19, 0, '2021-08-02 11:11:10', '2021-08-02 11:11:10'),
(20, 0, '2021-08-02 11:13:38', '2021-08-02 11:13:38'),
(21, 0, '2021-08-02 11:13:38', '2021-08-02 11:13:38'),
(22, 0, '2021-08-02 11:15:14', '2021-08-02 11:15:14'),
(23, 0, '2021-08-02 11:15:14', '2021-08-02 11:15:14'),
(24, 0, '2021-08-02 11:16:08', '2021-08-02 11:16:08'),
(25, 0, '2021-08-02 11:16:08', '2021-08-02 11:16:08'),
(26, 0, '2021-08-02 11:18:42', '2021-08-02 11:18:42'),
(27, 0, '2021-08-02 11:18:42', '2021-08-02 11:18:42'),
(28, 0, '2021-08-02 11:18:57', '2021-08-02 11:18:57'),
(29, 0, '2021-08-02 11:18:57', '2021-08-02 11:18:57'),
(30, 0, '2021-08-02 11:19:59', '2021-08-02 11:19:59'),
(31, 0, '2021-08-02 11:19:59', '2021-08-02 11:19:59'),
(32, 0, '2021-08-02 11:20:25', '2021-08-02 11:20:25'),
(33, 0, '2021-08-02 11:20:25', '2021-08-02 11:20:25'),
(34, 0, '2021-08-02 11:21:38', '2021-08-02 11:21:38'),
(35, 0, '2021-08-02 11:21:38', '2021-08-02 11:21:38'),
(36, 0, '2021-08-02 11:22:03', '2021-08-02 11:22:03'),
(37, 0, '2021-08-02 11:22:03', '2021-08-02 11:22:03'),
(38, 0, '2021-08-02 11:22:36', '2021-08-02 11:22:36'),
(39, 0, '2021-08-02 11:22:36', '2021-08-02 11:22:36'),
(40, 0, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(41, 0, '2021-08-02 11:22:52', '2021-08-02 11:22:52'),
(42, 0, '2021-08-02 11:24:48', '2021-08-02 11:24:48'),
(43, 0, '2021-08-02 11:24:48', '2021-08-02 11:24:48'),
(44, 0, '2021-08-02 11:25:20', '2021-08-02 11:25:20'),
(45, 0, '2021-08-02 11:25:20', '2021-08-02 11:25:20'),
(46, 0, '2021-08-02 11:26:04', '2021-08-02 11:26:04'),
(47, 0, '2021-08-02 11:26:04', '2021-08-02 11:26:04'),
(48, 0, '2021-08-02 11:26:32', '2021-08-02 11:26:32'),
(49, 0, '2021-08-02 11:26:32', '2021-08-02 11:26:32'),
(50, 0, '2021-08-02 11:26:52', '2021-08-02 11:26:52'),
(51, 0, '2021-08-02 11:26:52', '2021-08-02 11:26:52'),
(52, 0, '2021-08-02 11:27:27', '2021-08-02 11:27:27'),
(53, 0, '2021-08-02 11:27:27', '2021-08-02 11:27:27'),
(54, 0, '2021-08-02 15:52:24', '2021-08-02 15:52:24'),
(55, 0, '2021-08-02 15:52:24', '2021-08-02 15:52:24'),
(56, 0, '2021-08-02 15:52:54', '2021-08-02 15:52:54'),
(57, 0, '2021-08-02 15:52:54', '2021-08-02 15:52:54'),
(58, 0, '2021-08-02 15:55:24', '2021-08-02 15:55:24'),
(59, 0, '2021-08-02 15:55:24', '2021-08-02 15:55:24'),
(60, 0, '2021-08-02 15:55:32', '2021-08-02 15:55:32'),
(61, 0, '2021-08-02 15:55:32', '2021-08-02 15:55:32'),
(62, 0, '2021-08-02 16:07:01', '2021-08-02 16:07:01'),
(63, 0, '2021-08-02 16:07:01', '2021-08-02 16:07:01'),
(64, 0, '2021-08-03 04:13:07', '2021-08-03 04:13:07'),
(65, 0, '2021-08-03 04:13:07', '2021-08-03 04:13:07'),
(66, 10, '2021-08-03 05:17:18', '2021-08-03 05:17:18'),
(67, 10, '2021-08-03 05:17:41', '2021-08-03 05:17:41'),
(68, 10, '2021-08-14 01:20:50', '2021-08-14 01:20:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_roles`
--
ALTER TABLE `accounts_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_acounts`
--
ALTER TABLE `employee_acounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_stocks`
--
ALTER TABLE `products_stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_price`
--
ALTER TABLE `product_price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sold`
--
ALTER TABLE `sold`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whole_sold`
--
ALTER TABLE `whole_sold`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_roles`
--
ALTER TABLE `accounts_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `credentials`
--
ALTER TABLE `credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employee_acounts`
--
ALTER TABLE `employee_acounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `products_stocks`
--
ALTER TABLE `products_stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_price`
--
ALTER TABLE `product_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sold`
--
ALTER TABLE `sold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `whole_sold`
--
ALTER TABLE `whole_sold`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
