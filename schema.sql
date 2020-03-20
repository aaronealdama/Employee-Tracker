DROP DATABASE IF EXISTS cms_DB;

-- Create Database

CREATE DATABASE cms_DB;
USE cms_DB;

-- Tables

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT,
    name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE employee_role
    (
        id INT
        AUTO_INCREMENT,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (18,2) NOT NULL,
    department_id INT
        (20) NOT NULL,
    PRIMARY KEY
        (id), 
    FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT
            (20) NOT NULL,
    manager_id INT
            (20),
    PRIMARY KEY
            (id),
    FOREIGN KEY
            (role_id) REFERENCES employee_role
            (id)
);