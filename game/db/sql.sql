CREATE DATABASE advancer;

USE advancer;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    armour INT,
    speed INT,
    laser INT,
    missile INT,
    energy INT
);

CREATE TABLE lasers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE ships (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(255),
    boundingvolume VARCHAR(255)
);
 