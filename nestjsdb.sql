-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2026 at 09:55 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nestjsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbladmin`
--

CREATE TABLE `tbladmin` (
  `id` int NOT NULL,
  `gro_id` int NOT NULL,
  `adm_level` int DEFAULT NULL,
  `adm_status` int NOT NULL DEFAULT '1',
  `adm_account` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_rewrite` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_mobile` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adm_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbladmin`
--

INSERT INTO `tbladmin` (`id`, `gro_id`, `adm_level`, `adm_status`, `adm_account`, `adm_password`, `adm_name`, `adm_rewrite`, `adm_mobile`, `adm_email`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 1, 'admin', '$2b$10$UZBL0I1jFqVdDh40wZ.HguefmgrPSpJhtQGdymxJdGdyHQ.h0Jpz.', 'Me, my friends and polar bears', '', '', '', '0000-00-00 00:00:00', '2026-10-07 17:03:55.497014'),
(3, 2, 2, 1, 'admin2', '$2b$10$UZBL0I1jFqVdDh40wZ.HguefmgrPSpJhtQGdymxJdGdyHQ.h0Jpz.', 'àdas2', '', '', '', '0000-00-00 00:00:00', '2026-10-07 17:03:59.285835'),
(4, 3, NULL, 1, 'knv', '123', 'knv2', 'knv2', NULL, NULL, '2026-09-25 06:43:58', '2026-09-29 11:14:20.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
