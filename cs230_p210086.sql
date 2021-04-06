-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 05, 2021 at 04:32 AM
-- Server version: 10.3.27-MariaDB-0+deb10u1
-- PHP Version: 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_p210086`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `CustomerID` int(11) NOT NULL,
  `Title` varchar(10) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `MobileNumber` varchar(20) NOT NULL,
  `EmailAddress` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`CustomerID`, `Title`, `FirstName`, `LastName`, `MobileNumber`, `EmailAddress`) VALUES
(1, 'Mr', 'John', 'Murphy', '0838622454', 'gary.m@live.ie'),
(2, 'Mr', 'John', 'Murphy', '0838622454', 'andy.walsh@gmail.com'),
(3, 'Mr', 'Jonathan', 'McNamee', '+353838622454', 'jonathanmc.jm94@gmail.com'),
(4, 'Mx', 'John', 'Murphy', '0853245687', 'jonathanmc.jm94@gmail.com'),
(5, 'Ms', 'Ann ', 'Boylan', '08323456345', 'a.boylan@hotmail.com'),
(6, 'Ms', 'Charlotte', 'Ryan', '0856346278', 'charlottery.an@hotmail.com'),
(7, 'Ms', 'Chloe', 'McNamee', '0835437895', 'chloe.mc@gmail.com'),
(8, 'Mr', 'Frank', 'Jones', '0866234526', 'frankthetank@gmail.com'),
(9, 'Mr', 'John', 'Murphy', '0838622454', 'gavo.murph@live.ie'),
(10, 'Mr', 'Christy', 'McNamee', '0872323665', 'christyscabs@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Customer_Addresses`
--

CREATE TABLE `Customer_Addresses` (
  `CustomerID` int(11) NOT NULL,
  `ShippingAddressID` int(11) NOT NULL,
  `HomeAddressID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Customer_Addresses`
--

INSERT INTO `Customer_Addresses` (`CustomerID`, `ShippingAddressID`, `HomeAddressID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `HomeAddress`
--

CREATE TABLE `HomeAddress` (
  `HomeAddressID` int(11) NOT NULL,
  `AddressLine1` varchar(255) NOT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `Town` varchar(20) NOT NULL,
  `CityorCounty` varchar(20) NOT NULL,
  `Eircode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `HomeAddress`
--

INSERT INTO `HomeAddress` (`HomeAddressID`, `AddressLine1`, `AddressLine2`, `Town`, `CityorCounty`, `Eircode`) VALUES
(1, 'Fahamore', '', 'Castlegregory', 'Kerry', 'V92 A3H5'),
(2, '11 Market Square', '', 'Portlaoise', 'Laois', 'R32 P89N'),
(3, '10 Silken Vale', '', 'Maynooth', 'Kildare', 'W23X2Y1'),
(4, '10 Silken Vale', '', 'Maynooth', 'Kildare', ''),
(5, '10 Mountjoy Square', '', 'Dublin', 'Dublin', 'D01 N624'),
(6, '10 Wench Lane', '', 'Carlow', 'Carlow', 'R21 HH77'),
(7, 'Stoney Road', '', 'Oldcastle', 'Meath', 'A82 HY74'),
(8, 'Murmod', '', 'Virginia', 'Cavan', 'V94 03T2'),
(9, 'Harbour St.', '', 'Mullingar', 'Westmeath', 'N91 WD53'),
(10, 'Stoney Road', '', 'Oldcastle', 'Meath', 'A82 HY74'),
(12, '123 Fake Street', '', 'OrageCounty', 'Madeupville', 'A34 HS95'),
(13, 'fake', '', 'fake', 'fake', '');

-- --------------------------------------------------------

--
-- Table structure for table `ShippingAddress`
--

CREATE TABLE `ShippingAddress` (
  `ShippingAddressID` int(11) NOT NULL,
  `AddressLine1` varchar(255) NOT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `Town` varchar(20) NOT NULL,
  `CountyorCity` varchar(50) NOT NULL,
  `Eircode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ShippingAddress`
--

INSERT INTO `ShippingAddress` (`ShippingAddressID`, `AddressLine1`, `AddressLine2`, `Town`, `CountyorCity`, `Eircode`) VALUES
(1, 'Fahamore', 'Castlegregory', 'Castlegregory', 'Kerry', 'V92 A3H5'),
(2, '11 Market Square', 'Portlaoise', 'Laois', 'Laois', 'R32 P89N'),
(3, 'Stoney Road', '', 'Oldcastle', 'Meath', 'A82 HY74'),
(4, '10 Silken Vale', '', 'Maynooth', 'Kildare', 'W23 X2Y1'),
(5, '10 Mountjoy Square', 'Dublin', 'Dublin', 'Dublin', 'D01 N624'),
(6, '10 Wench Lane', '', 'Carlow', 'Carlow', 'R21 HH77'),
(7, 'Stoney Road', '', 'Oldcastle', 'Meath', 'A82 HY74'),
(8, 'Murmod', '', 'Virginia', 'Cavan', 'V94 03T2'),
(9, 'Harbour St.', '', 'Mullingar', 'Westmeath', 'N91 WD53'),
(10, 'Stoney Road', 'Oldcastle', 'Oldcastle', 'Meath', 'A82 HY74'),
(12, '123 Fake Street', '', 'OrageCounty', 'Madeupville', 'A34 HS95'),
(13, 'fake', '', 'fake', 'fake', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `Customer_Addresses`
--
ALTER TABLE `Customer_Addresses`
  ADD PRIMARY KEY (`CustomerID`,`ShippingAddressID`,`HomeAddressID`),
  ADD KEY `Customer_Addresses_ibfk_2` (`ShippingAddressID`),
  ADD KEY `Customer_Addresses_ibfk_3` (`HomeAddressID`);

--
-- Indexes for table `HomeAddress`
--
ALTER TABLE `HomeAddress`
  ADD PRIMARY KEY (`HomeAddressID`);

--
-- Indexes for table `ShippingAddress`
--
ALTER TABLE `ShippingAddress`
  ADD PRIMARY KEY (`ShippingAddressID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `HomeAddress`
--
ALTER TABLE `HomeAddress`
  MODIFY `HomeAddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ShippingAddress`
--
ALTER TABLE `ShippingAddress`
  MODIFY `ShippingAddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customer_Addresses`
--
ALTER TABLE `Customer_Addresses`
  ADD CONSTRAINT `Customer_Addresses_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Customer_Addresses_ibfk_2` FOREIGN KEY (`ShippingAddressID`) REFERENCES `ShippingAddress` (`ShippingAddressID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Customer_Addresses_ibfk_3` FOREIGN KEY (`HomeAddressID`) REFERENCES `HomeAddress` (`HomeAddressID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
