CREATE DATABASE advancer;

USE advancer;

CREATE TABLE users (
    /*id VARCHAR(255) PRIMARY KEY,*/
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fingerprint VARCHAR(255),
    balance INT DEFAULT 30,
    armor   INT DEFAULT 1,
    speed   INT DEFAULT 1,
    laser   INT DEFAULT 1,
    missile INT DEFAULT 1,
    energy  INT DEFAULT 1
);

CREATE TABLE lasers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid   INT,
    location VARCHAR(255),
    time     DATETIME default CURRENT_TIMESTAMP
);

CREATE TABLE ships (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid  INT,
    polygon VARCHAR(255),
    time    DATETIME default CURRENT_TIMESTAMP
);
