-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2021 at 08:13 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.14

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
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `id` int(11) NOT NULL,
  `business_name` varchar(100) NOT NULL,
  `category` int(11) NOT NULL,
  `owners_id` int(11) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`id`, `business_name`, `category`, `owners_id`, `date_updated`, `date_created`) VALUES
(1, 'dawdawd', 3, 1, '2021-04-21 17:51:16', '2021-04-21 17:51:16'),
(2, 'awdawd', 2, 1, '2021-04-21 18:01:37', '2021-04-21 18:01:37'),
(3, 'Ferslife care', 1, 1, '2021-04-21 18:02:22', '2021-04-21 18:02:22'),
(4, 'awdawd566456', 3, 1, '2021-04-21 18:29:40', '2021-04-21 18:29:40'),
(5, '56456', 1, 1, '2021-04-21 18:31:33', '2021-04-21 18:31:33'),
(6, '888', 1, 1, '2021-04-21 18:32:50', '2021-04-21 18:32:50');

-- --------------------------------------------------------

--
-- Table structure for table `business_category`
--

CREATE TABLE `business_category` (
  `id` int(11) NOT NULL,
  `category` varchar(20) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `business_category`
--

INSERT INTO `business_category` (`id`, `category`, `date_updated`, `date_created`) VALUES
(1, 'restaurant', '2021-04-21 17:42:06', '2021-04-21 17:42:06'),
(2, 'store', '2021-04-21 17:42:06', '2021-04-21 17:42:06'),
(3, 'pharmacy', '2021-04-21 17:42:06', '2021-04-21 17:42:06');

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
(1, 1, '500', '2021-04-22 09:42:13', '2021-04-22 09:42:13');

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
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `shop_id`, `fname`, `lname`, `address`, `contact`, `gender`, `date_updated`, `date_created`) VALUES
(1, 1, 'awdawd', 'awd', 'awd', 'awd', '0', '2021-04-19 17:50:15', '2021-04-19 17:50:15'),
(2, 1, 'awdawd', 'awd', 'awd', 'awd', 'awd', '2021-04-19 17:50:46', '2021-04-19 17:50:46'),
(3, 1, 'awdawd', 'awd', 'awd', 'awd', 'awd', '2021-04-19 17:50:59', '2021-04-19 17:50:59'),
(4, 1, 'awdawd', 'awd', 'awd', 'awd', 'female', '2021-04-19 17:51:14', '2021-04-19 17:51:14'),
(5, 1, 'awdaw', 'dawda', 'dawda', 'awdawd', 'male', '2021-04-19 17:53:06', '2021-04-19 17:53:06'),
(6, 1, 'awdawd', 'wdawd', 'wdawd', 'awdaw', 'female', '2021-04-19 17:53:34', '2021-04-19 17:53:34'),
(7, 1, 'awdaw', 'dawd', 'dawd', 'awd', 'male', '2021-04-19 17:54:03', '2021-04-19 17:54:03'),
(8, 1, 'dawd', 'awdaw', 'awdaw', 'awdawd', 'male', '2021-04-19 17:55:46', '2021-04-19 17:55:46'),
(9, 1, 'awdawd', 'awd', 'awd', 'awd', 'female', '2021-04-19 17:56:10', '2021-04-19 17:56:10');

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
  `business_id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `category` varchar(25) NOT NULL,
  `barcode` varchar(40) NOT NULL,
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `business_id`, `product_name`, `category`, `barcode`, `date_updated`, `date_created`) VALUES
(1, 0, 'awdawd', '1', '65456', '2021-04-22 16:03:37', '2021-04-22 16:03:37'),
(2, 0, 'awdwa', '1', 'awdaw', '2021-04-22 16:06:09', '2021-04-22 16:06:09'),
(3, 1, 'awdwa', '1', 'awdaw', '2021-04-22 16:06:42', '2021-04-22 16:06:42'),
(4, 1, 'awdwa', '1', 'awdaw', '2021-04-22 16:09:00', '2021-04-22 16:09:00'),
(5, 1, 'awdawd', '1', 'saefsef', '2021-04-22 16:16:16', '2021-04-22 16:16:16'),
(6, 1, 'dawd', '1', '56456', '2021-04-22 16:17:14', '2021-04-22 16:17:14'),
(7, 1, 'awdawd', '1', '6456', '2021-04-22 16:17:59', '2021-04-22 16:17:59'),
(8, 1, 'awdawd', '1', '6456', '2021-04-22 16:18:24', '2021-04-22 16:18:24'),
(9, 1, 'dawda', '1', 'awdaw', '2021-04-22 16:20:20', '2021-04-22 16:20:20'),
(10, 1, '345345', '1', '5454', '2021-04-22 16:20:36', '2021-04-22 16:20:36'),
(11, 1, '987987', '1', '798987', '2021-04-23 18:04:27', '2021-04-23 18:04:27'),
(12, 1, 'awdawd', '1', '345345', '2021-04-23 18:12:15', '2021-04-23 18:12:15'),
(13, 1, 'awdawd', '1', '345345', '2021-04-23 18:12:41', '2021-04-23 18:12:41'),
(14, 1, 'awdawd', '1', '345345', '2021-04-23 18:13:05', '2021-04-23 18:13:05');

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
(11, 14, 345345, '2021-04-23 18:13:05', '2021-04-23 18:13:05');

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
(3, 14, 'gallery/20/60830e314f2881619201585.jpg', 'gallery/50/60830e314cfec1619201585.jpg', 'gallery/100/60830e314cd331619201585.jpg', '2021-04-23 18:13:05', '2021-04-23 18:13:05');

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
(8, 14, 345345, '2021-04-23 18:13:05', '2021-04-23 18:13:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business_category`
--
ALTER TABLE `business_category`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `business_category`
--
ALTER TABLE `business_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT for table `owner`
--
ALTER TABLE `owner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products_stocks`
--
ALTER TABLE `products_stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_price`
--
ALTER TABLE `product_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
