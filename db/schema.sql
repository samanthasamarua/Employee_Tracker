DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the "employee_tracker_db" database --
CREATE DATABASE employee_tracker_db;

-- Makes it so all of the following code will affect employee_tracker_db --
USE employee_tracker_db;

-- Creates the table "produce" within employee_tracker_db --
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id: INT NOT NULL
  FOREIGN KEY (department_id),
  REFERENCES department_id
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id),
  REFERENCES role_id
);