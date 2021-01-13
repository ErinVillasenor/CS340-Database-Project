-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 11, 2019 at 03:11 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_mandichj`
--

-- --------------------------------------------------------

--
-- Table structure for table `hxh_aura_type`
--

CREATE TABLE `hxh_aura_type` (
  `aura_id` int(11) NOT NULL,
  `aura_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_aura_type`
--

INSERT INTO `hxh_aura_type` (`aura_id`, `aura_name`) VALUES
(1, 'Enhancer'),
(2, 'Transmuter'),
(3, 'Conjurer'),
(4, 'Specialist'),
(5, 'Manipulator'),
(6, 'Emitter');

-- --------------------------------------------------------

--
-- Table structure for table `hxh_character`
--

CREATE TABLE `hxh_character` (
  `character_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `race` varchar(20) NOT NULL DEFAULT 'human'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hxh_character`
--

INSERT INTO `hxh_character` (`character_id`, `first_name`, `last_name`, `race`) VALUES
(1, 'Gon', 'Freecs', 'human'),
(4, 'Killua', 'Zoldyck', 'human'),
(5, NULL, 'Kurapika', 'human'),
(6, 'Leorio', 'Paradinight', 'human');

-- --------------------------------------------------------

--
-- Table structure for table `hxh_character_relationships`
--

CREATE TABLE `hxh_character_relationships` (
  `character_friends` bit(1) NOT NULL DEFAULT b'0',
  `character_id1` int(11) NOT NULL,
  `character_id2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_character_relationships`
--

INSERT INTO `hxh_character_relationships` (`character_friends`, `character_id1`, `character_id2`) VALUES
(b'1', 1, 4),
(b'1', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `hxh_CharAura`
--

CREATE TABLE `hxh_CharAura` (
  `character_id` int(11) NOT NULL,
  `aura_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_CharAura`
--

INSERT INTO `hxh_CharAura` (`character_id`, `aura_id`) VALUES
(1, 1),
(4, 2),
(5, 4),
(5, 3),
(6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `hxh_CharOrg`
--

CREATE TABLE `hxh_CharOrg` (
  `character_id` int(11) NOT NULL,
  `OrgId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_CharOrg`
--

INSERT INTO `hxh_CharOrg` (`character_id`, `OrgId`) VALUES
(1, 0),
(5, 0),
(4, 0),
(6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `hxh_location`
--

CREATE TABLE `hxh_location` (
  `LocID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_location`
--

INSERT INTO `hxh_location` (`LocID`, `Name`) VALUES
(1, 'Swardani'),
(2, 'Kukuroo Mountain'),
(3, 'Whale Island');

-- --------------------------------------------------------

--
-- Table structure for table `hxh_organizations`
--

CREATE TABLE `hxh_organizations` (
  `OrgId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `LocID` int(11) DEFAULT NULL,
  `Alignment` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hxh_organizations`
--

INSERT INTO `hxh_organizations` (`OrgId`, `Name`, `LocID`, `Alignment`) VALUES
(0, 'Hunter Assosciation', 1, 'Lawful Neutral'),
(1, 'Phantom Troupe', 1, 'Chaotic Evil');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hxh_aura_type`
--
ALTER TABLE `hxh_aura_type`
  ADD PRIMARY KEY (`aura_id`);

--
-- Indexes for table `hxh_character`
--
ALTER TABLE `hxh_character`
  ADD PRIMARY KEY (`character_id`);

--
-- Indexes for table `hxh_character_relationships`
--
ALTER TABLE `hxh_character_relationships`
  ADD KEY `character_id1` (`character_id1`),
  ADD KEY `character_id2` (`character_id2`);

--
-- Indexes for table `hxh_CharAura`
--
ALTER TABLE `hxh_CharAura`
  ADD KEY `character_id` (`character_id`),
  ADD KEY `aura_id` (`aura_id`);

--
-- Indexes for table `hxh_CharOrg`
--
ALTER TABLE `hxh_CharOrg`
  ADD KEY `character_id` (`character_id`),
  ADD KEY `OrgId` (`OrgId`);

--
-- Indexes for table `hxh_location`
--
ALTER TABLE `hxh_location`
  ADD PRIMARY KEY (`LocID`);

--
-- Indexes for table `hxh_organizations`
--
ALTER TABLE `hxh_organizations`
  ADD PRIMARY KEY (`OrgId`),
  ADD KEY `LocID` (`LocID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hxh_aura_type`
--
ALTER TABLE `hxh_aura_type`
  MODIFY `aura_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hxh_character`
--
ALTER TABLE `hxh_character`
  MODIFY `character_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hxh_location`
--
ALTER TABLE `hxh_location`
  MODIFY `LocID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hxh_organizations`
--
ALTER TABLE `hxh_organizations`
  MODIFY `OrgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hxh_character_relationships`
--
ALTER TABLE `hxh_character_relationships`
  ADD CONSTRAINT `hxh_character_relationships_ibfk_1` FOREIGN KEY (`character_id1`) REFERENCES `hxh_character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hxh_character_relationships_ibfk_2` FOREIGN KEY (`character_id2`) REFERENCES `hxh_character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hxh_CharAura`
--
ALTER TABLE `hxh_CharAura`
  ADD CONSTRAINT `hxh_CharAura_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `hxh_character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hxh_CharAura_ibfk_2` FOREIGN KEY (`aura_id`) REFERENCES `hxh_aura_type` (`aura_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hxh_CharOrg`
--
ALTER TABLE `hxh_CharOrg`
  ADD CONSTRAINT `hxh_CharOrg_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `hxh_character` (`character_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hxh_CharOrg_ibfk_2` FOREIGN KEY (`OrgId`) REFERENCES `hxh_organizations` (`OrgId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hxh_organizations`
--
ALTER TABLE `hxh_organizations`
  ADD CONSTRAINT `hxh_organizations_ibfk_1` FOREIGN KEY (`LocID`) REFERENCES `hxh_location` (`LocID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
