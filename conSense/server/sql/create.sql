-- phpMyAdmin SQL Dump
-- version 2.10.0.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 05, 2007 at 02:15 AM
-- Server version: 5.0.27
-- PHP Version: 5.2.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `rsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `rsdbaccessrights`
--
-- Creation: Mar 15, 2007 at 01:23 PM
-- Last update: Mar 25, 2007 at 04:07 AM
--

DROP TABLE IF EXISTS `rsdbaccessrights`;
CREATE TABLE IF NOT EXISTS `rsdbaccessrights` (
  `userId` varchar(30) NOT NULL,
  `accessRight` set('select','insert','update') NOT NULL default '',
  `tableName` varchar(100) NOT NULL,
  PRIMARY KEY  (`userId`,`accessRight`,`tableName`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rsdbaccessrights`
--

INSERT INTO `rsdbaccessrights` (`userId`, `accessRight`, `tableName`) VALUES
('admin', 'select', 'RSUser'),
('guest', 'select', 'RSTest'),
('guest', 'select', 'rsuitexts');

-- --------------------------------------------------------

--
-- Table structure for table `rstest`
--
-- Creation: Mar 15, 2007 at 01:24 PM
-- Last update: Mar 15, 2007 at 02:24 PM
--

DROP TABLE IF EXISTS `rstest`;
CREATE TABLE IF NOT EXISTS `rstest` (
  `testId` int(11) NOT NULL auto_increment,
  `testColumn` varchar(100) NOT NULL default '',
  PRIMARY KEY  (`testId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `rstest`
--

INSERT INTO `rstest` (`testId`, `testColumn`) VALUES
(1, 'alpha'),
(2, 'beta');

-- --------------------------------------------------------

--
-- Table structure for table `rsuser`
--
-- Creation: Apr 04, 2007 at 03:34 PM
-- Last update: Apr 05, 2007 at 01:36 AM
--

DROP TABLE IF EXISTS `rsuser`;
CREATE TABLE IF NOT EXISTS `rsuser` (
  `userId` varchar(30) NOT NULL default '',
  `passwordHash` varchar(128) NOT NULL default 'deadbeef',
  `userType` varchar(100) NOT NULL default 'deadbeef',
  PRIMARY KEY  (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rsuser`
--

INSERT INTO `rsuser` (`userId`, `passwordHash`, `userType`) VALUES
('admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'admin'),
('guest', '', 'deadbeef');
