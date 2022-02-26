/*
 Navicat Premium Data Transfer

 Source Server         : LocalHost
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : localhost:3306
 Source Schema         : bot

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 26/02/2022 22:11:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for list_ban
-- ----------------------------
DROP TABLE IF EXISTS `list_ban`;
CREATE TABLE `list_ban`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminID` bigint NOT NULL DEFAULT -1,
  `reason` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `userID` bigint NOT NULL DEFAULT -1,
  `timeStart` timestamp NOT NULL DEFAULT current_timestamp,
  `timeEnd` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of list_ban
-- ----------------------------

-- ----------------------------
-- Table structure for list_mute
-- ----------------------------
DROP TABLE IF EXISTS `list_mute`;
CREATE TABLE `list_mute`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminID` bigint NOT NULL DEFAULT -1,
  `reason` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `userID` bigint NOT NULL DEFAULT -1,
  `timeStart` timestamp NOT NULL DEFAULT current_timestamp,
  `timeEnd` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of list_mute
-- ----------------------------

-- ----------------------------
-- Table structure for list_warn
-- ----------------------------
DROP TABLE IF EXISTS `list_warn`;
CREATE TABLE `list_warn`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminID` bigint NOT NULL DEFAULT -1,
  `reason` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `userID` bigint NOT NULL DEFAULT -1,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of list_warn
-- ----------------------------

-- ----------------------------
-- Table structure for log_admin
-- ----------------------------
DROP TABLE IF EXISTS `log_admin`;
CREATE TABLE `log_admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminID` bigint NOT NULL DEFAULT -1,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `params` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '{ }',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_admin
-- ----------------------------

-- ----------------------------
-- Table structure for log_any
-- ----------------------------
DROP TABLE IF EXISTS `log_any`;
CREATE TABLE `log_any`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `params` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '{ }',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_any
-- ----------------------------

-- ----------------------------
-- Table structure for log_system
-- ----------------------------
DROP TABLE IF EXISTS `log_system`;
CREATE TABLE `log_system`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `params` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '{ }',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_system
-- ----------------------------

-- ----------------------------
-- Table structure for log_user
-- ----------------------------
DROP TABLE IF EXISTS `log_user`;
CREATE TABLE `log_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` bigint NOT NULL DEFAULT -1,
  `action` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `params` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '{ }',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_user
-- ----------------------------

-- ----------------------------
-- Table structure for reaction_messages
-- ----------------------------
DROP TABLE IF EXISTS `reaction_messages`;
CREATE TABLE `reaction_messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` bigint NOT NULL DEFAULT -1,
  `role` bigint NOT NULL DEFAULT -1,
  `reaction` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reaction_messages
-- ----------------------------
INSERT INTO `reaction_messages` VALUES (1, 939230923554160701, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (2, 939231733834989628, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (3, 939234517128994827, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (4, 939525733863260160, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (5, 939526615883460648, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (6, 939526935179051058, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (7, 939527372351348747, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (8, 939527601033203742, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (9, 939528404494086168, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (10, 939528924440985662, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (11, 939530040411058227, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (12, 939530452107153438, 928074468402802688, '??');
INSERT INTO `reaction_messages` VALUES (13, 939531545948074085, 928074468402802688, '??');

SET FOREIGN_KEY_CHECKS = 1;
