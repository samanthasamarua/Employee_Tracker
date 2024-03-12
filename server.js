// Added Dependencies
const express = require('express');

const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const query = require('./Assets/db'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Prompt questions
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Employee Tracker Main Menu',
      name: 'Prompts',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees', 
        'Add a Department',
        'Add a Role', 
        'Add an employee', 
        'Update an employee role',
        'Exit',
      ],
    },
  ])

  // Main function to prompt the user with menu options
function promptQuestions() {
  // Prompt questions
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select an action',
        name: 'Prompts',
        choices: [
          'View all Departments',
          'View all Roles',
          'View all employees', 
          'Add a Department',
          'Add a Role', 
          'Add an employee', 
          'Update an employee role',
          'Return to Main Menu', 
          'Quit',
        ],
      },
    ])
    .then(async (answers) => {
      const { Prompts } = answers;

      if (Prompts.includes('View all Departments')) {
        console.log('Displaying all departments..');

        try {
          const sql = `SELECT id, name AS Department FROM department`;
          const res = await query(sql);
          console.table(res);
        } catch (err) {
          console.error(err);
        }
      } else if (Prompts.includes('View all Roles')) {
        console.log('Displaying all Roles..');

        try {
          const sql = `
          SELECT 
            role.id AS 'Role ID',
            role.title AS 'Job Title',
            department.name AS 'Department',
            role.salary AS 'Salary'
          FROM 
            role
          INNER JOIN 
            department ON role.department_id = department.id
        `;
          const res = await query(sql);
          console.table(res);
        } catch (err) {
          console.error(err);
        }
      } else if (Prompts.includes('View all Employees')) {
        console.log('Displaying all Employees..');

        try {
          const sql = `
          SELECT 
            e.id AS 'Employee ID',
            e.first_name AS 'First Name',
            e.last_name AS 'Last Name',
            r.title AS 'Job Title',
            d.name AS 'Department',
            r.salary AS 'Salary',
            CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
          FROM 
            employee e
          INNER JOIN 
            role r ON e.role_id = r.id
          INNER JOIN 
            department d ON r.department_id = d.id
          LEFT JOIN 
            employee m ON e.manager_id = m.id
        `;
          const res = await query(sql);
          console.table(res);
        } catch (err) {
          console.error(err);
        }
      } else if (Prompts.includes('Add a Department')) {
        console.log('Adding a Department..');

        inquirer
          .prompt([
            {
              type: 'input',
              message: 'Enter the name of the department:',
              name: 'departmentName',
            },
          ])
          .then(async (answers) => {
            const { departmentName } = answers;

            try {
              const sql = `INSERT INTO department (name) VALUES (?)`;
              await query(sql, [departmentName]);
              console.log('Department added successfully!');
              promptQuestions();
            } catch (err) {
              console.error('Error adding department:', err);
            }
          });
      } else if (Prompts.includes('Add a Role')) {
        console.log('Adding a Role..');

       
        try {
          const departmentSQL = `SELECT id, name FROM department`;
          const departments = await query(departmentSQL);

      
          const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id,
          }));

          inquirer
            .prompt([
              {
                type: 'input',
                message: 'Enter the name of the role:',
                name: 'roleName',
              },
              {
                type: 'input',
                message: 'Enter the salary for the role:',
                name: 'salary',
              },
              {
                type: 'list',
                message: 'Select the department for the role:',
                name: 'departmentId',
                choices: departmentChoices,
              },
            ])
            .then(async (answers) => {
              const { roleName, salary, departmentId } = answers;

              try {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                await query(sql, [roleName, salary, departmentId]);
                console.log('Role added successfully!');
                promptQuestions();
              } catch (err) {
                console.error('Error adding role:', err);
              }
            });
        } catch (err) {
          console.error('Error retrieving departments:', err);
        }
      } else if (Prompts.includes('Add an employee')) {
        console.log('Adding an Employee..');

    
        try {
          const roleSQL = `SELECT id, title FROM role`;
          const roles = await query(roleSQL);

          const employeeSQL = `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee`;
          const employees = await query(employeeSQL);

          const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id,
          }));

          const managerChoices = employees.map(employee => ({
            name: employee.full_name,
            value: employee.id,
          }));

          managerChoices.unshift({ name: 'None', value: null });

          inquirer
            .prompt([
              {
                type: 'input',
                message: "Enter the employee's first name:",
                name: 'firstName',
              },
              {
                type: 'input',
                message: "Enter the employee's last name:",
                name: 'lastName',
              },
              {
                type: 'list',
                message: "Select the employee's role:",
                name: 'roleId',
                choices: roleChoices,
              },
              {
                type: 'list',
                message: "Select the employee's manager:",
                name: 'managerId',
                choices: managerChoices,
              },
            ])
            .then(async (answers) => {
              const { firstName, lastName, roleId, managerId } = answers;

              try {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                await query(sql, [firstName, lastName, roleId, managerId]);
                console.log('Employee added successfully!');
                promptQuestions();
              } catch (err) {
                console.error('Error adding employee:', err);
              }
            });
        } catch (err) {
          console.error('Error retrieving roles and employees:', err);
        }
      } else if (Prompts.includes('Update an employee role')) {
        console.log('Updating an Employee Role..');

        try {
          const employeeSQL = `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee`;
          const employees = await query(employeeSQL);

          const roleSQL = `SELECT id, title FROM role`;
          const roles = await query(roleSQL);

          const employeeChoices = employees.map(employee => ({
            name: employee.full_name,
            value: employee.id,
          }));

          const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id,
          }));

          inquirer
            .prompt([
              {
                type: 'list',
                message: 'Select the employee to update:',
                name: 'employeeId',
                choices: employeeChoices,
              },
              {
                type: 'list',
                message: 'Select the employee\'s new role:',
                name: 'newRoleId',
                choices: roleChoices,
              },
            ])
            .then(async (answers) => {
              const { employeeId, newRoleId } = answers;

              try {
                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                await query(sql, [newRoleId, employeeId]);
                console.log('Employee role updated successfully!');
                promptQuestions();
              } catch (err) {
                console.error('Error updating employee role:', err);
              }
            });
        } catch (err) {
          console.error('Error retrieving employees and roles:', err);
        }
      } else if (Prompts.includes('Exit')) {
        console.log('Goodbye!');
        process.exit(0); 
      } else if (Prompts.includes('Return to Main Menu')) {
  
        promptQuestions();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

promptQuestions(); 


