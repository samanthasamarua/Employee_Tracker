const query = require('./db');
const inquirer = require('inquirer');

// Function for adding department
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

    inquirer.prompt([
      {
        type: 'list',
        message: 'What would you like to do next?',
        name: 'NextAction',
        choices: ['Return to Main Menu', 'Quit'],
      },
    ]).then((answer) => {
      if (answer.NextAction === 'Return to Main Menu') {
        promptQuestions(); 
        console.log('Exiting application...');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

// Function to add roles
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
        
        inquirer.prompt([
          {
            type: 'list',
            message: 'What would you like to do next?',
            name: 'NextAction',
            choices: ['Return to Main Menu', 'Quit'],
          },
        ]).then((answer) => {
          if (answer.NextAction === 'Return to Main Menu') {
            promptQuestions(); 
          } else {
            console.log('Exiting application...');
            process.exit(0); 
          }
        });
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

// Function to add employees
async function addEmployee(promptQuestions) {
  console.log('Adding an Employee..');

  try {
    // Fetch roles from the database
    const roleSQL = `SELECT id, title FROM role`;
    const roles = await query(roleSQL);

    // Fetch employees from the database to select a manager
    const employeeSQL = `SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee`;
    const employees = await query(employeeSQL);

    // Create choices for roles and managers
    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id,
    }));

    const managerChoices = employees.map(employee => ({
      name: employee.full_name,
      value: employee.id,
    }));

    // Add an option for no manager
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
