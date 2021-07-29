-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2021 at 06:58 PM
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
(1, 8, '345', '45345345', '2021-04-20 15:13:03', '2021-04-20 15:13:03');

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

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
