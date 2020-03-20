USE cms_DB;

INSERT INTO department
    (name)
VALUES
    ("Engineering");

INSERT INTO department
    (name)
VALUES
    ("Sales");

INSERT INTO department
    (name)
VALUES
    ("Marketing");

INSERT INTO department
    (name)
VALUES
    ("Human Resources");

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("Engineer", 75000, 1);

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ("Sales Representative", 65000, 2);

INSERT INTO employee_role
    (title,salary,department_id)
VALUES
    ("Marketing Representative", 65000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Aaron", "Ealdama", 1, 1);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Angela", "Li", 3, 1);