INSERT INTO department (id, name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal"),
     ;

INSERT INTO role (id, title, department_id, salary)
VALUES (001, "Sales Lead", "Sales", "100,000"),
       (002, "Salesperson", "Sales", "80,000"),
       (003, "Lead Engineer", "Engineering", "150,000"),
       (004, "Software Engineer", "Finance", "120,000"),
       (005, "Accounts Manager", "Finance", "160,000"),
       (006, "Accountant", "Finance", "125,000"),
       (007, "Legal Team Lead", "Legal" "250,000"),
       (008, "Lawyer", "Legal" "190,000"),
     ;

INSERT INTO role (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Doe", "Sales Lead", "Sales", "100,000", "null"),
       (002, "Mike", "Chan","Salesperson", "Sales", "80,000", "John Doe"),
       (003, "Ashley", "Rodriguez","Lead Engineer", "Engineering", "150,000", "null"),
       (004, "Kevin", "Tupik","Software Engineer", "Finance", "120,000", "Ashley Rodriguez"),
       (005, "Kunal", "Singh","Accounts Manager", "Finance", "160,000", "null"),
       (006, "Malia", "Brown","Accountant", "Finance", "125,000", "Kunal Singh"),
       (007, "Sarah", "Lourd","Legal Team Lead", "Legal" "250,000", "null"),
       (008, "Tom", "Allen","Lawyer", "Legal" "190,000", "Sarah Lourd"),
     ;
       
