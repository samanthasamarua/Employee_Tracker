const query = require('./db');
const inquirer = require('inquirer');

async function addDepartment(promptQuestions) {
  console.log('Adding a Department..');

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        message: 'Enter the name of the department:',
        name: 'departmentName',
      },
    ]);

    const { departmentName } = answers;

    const sql = `INSERT INTO department (name) VALUES (?)`;
    await query(sql, [departmentName]);
    console.log('Department added successfully!');
    // Prompt for the next action
    inquirer.prompt([
      {
        type: 'list',
        message: 'What would you like to do next?',
        name: 'NextAction',
        choices: ['Return to Main Menu', 'Quit'],
      },
    ]).then((answer) => {
      if (answer.NextAction === 'Return to Main Menu') {
        promptQuestions(); // Call the function to display the main menu
      } else {
        console.log('Exiting application...');
        process.exit(0); // Quit the application
      }
    });
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

async function addRole(promptQuestions) {
  console.log('Adding a Role..');

  try {
    const departmentSQL = `SELECT id, name FROM department`;
    const departments = await query(departmentSQL);

    const departmentChoices = departments.map(department => ({
      name: department.name,
      value: department.id,
    }));

    const answers = await inquirer.prompt([
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
    ]);

    const { roleName, salary, departmentId } = answers;

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    await query(sql, [roleName, salary, departmentId]);
    console.log('Role added successfully!');
        // Prompt for the next action
        inquirer.prompt([
          {
            type: 'list',
            message: 'What would you like to do next?',
            name: 'NextAction',
            choices: ['Return to Main Menu', 'Quit'],
          },
        ]).then((answer) => {
          if (answer.NextAction === 'Return to Main Menu') {
            promptQuestions(); // Call the function to display the main menu
          } else {
            console.log('Exiting application...');
            process.exit(0); // Quit the application
          }
        });
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

async function addEmployee(promptQuestions) {
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

    const answers = await inquirer.prompt([
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
    ]);

    const { firstName, lastName, roleId, managerId } = answers;

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    await query(sql, [firstName, lastName, roleId, managerId]);
    console.log('Employee added successfully!');
        // Prompt for the next action
        inquirer.prompt([
          {
            type: 'list',
            message: 'What would you like to do next?',
            name: 'NextAction',
            choices: ['Return to Main Menu', 'Quit'],
          },
        ]).then((answer) => {
          if (answer.NextAction === 'Return to Main Menu') {
            promptQuestions(); // Call the function to display the main menu
          } else {
            console.log('Exiting application...');
            process.exit(0); // Quit the application
          }
        });
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
