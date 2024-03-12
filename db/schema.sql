DROP DATABASE IF EXISTS employee_tracker_db;

-- Creates the "employee_tracker_db" database --
CREATE DATABASE employee_tracker_db;

-- Makes it so all of the following code will affect employee_tracker_db --
USE employee_tracker_db;

-- Creates the table "department" within employee_tracker_db --
CREATE TABLE department (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL
);

-- Creates the table "role" within employee_tracker_db --
CREATE TABLE role (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   department_id INT,
   salary DECIMAL NOT NULL,
   FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates the table "employee" within employee_tracker_db --
CREATE TABLE employee (
   id INT AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   FOREIGN KEY (role_id) REFERENCES role(id)
);
