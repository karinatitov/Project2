DROP DATABASE IF EXISTS project2_DB;

CREATE DATABASE project2_DB;

USE project2_DB;


CREATE TABLE activity (
    id INT NOT NULL AUTO_INCREMENT,
    act_name VARCHAR(255) NOT NULL,
    act_category VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);