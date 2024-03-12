const query = require('./db');
const inquirer = require('inquirer');

// Function to delete a department by its ID
async function deleteDepartment(promptQuestions) {
  try {
      // Fetch all departments from the database
      const departments = await query('SELECT * FROM department');

      // Extract department names and IDs for user selection
      const departmentChoices = departments.map(department => ({
          name: department.name,
          value: department.id,
      }));

      // Prompt the user to select a department to delete
      const { departmentId } = await inquirer.prompt([
          {
              type: 'list',
              message: 'Select a department to delete:',
              name: 'departmentId',
              choices: departmentChoices,
          },
      ]);

      // Execute the deletion query
      const sql = `DELETE FROM department WHERE id = ?`;
      await query(sql, [departmentId]);
      
      console.log('Department deleted successfully.');

      // Prompt for the next action
      const { NextAction } = await inquirer.prompt([
          {
              type: 'list',
              name: 'NextAction',
              choices: ['Return to Main Menu', 'Quit'],
          },
      ]);

      // Handle the user's choice
      if (NextAction === 'Return to Main Menu') {
          promptQuestions(); // Call the function to display the main menu
      } else {
          console.log('Exiting application...');
          process.exit(0); // Quit the application
      }

  } catch (error) {
      console.error('Error deleting department:', error);
  }
}

// Function to delete a role by its ID
async function deleteRole(promptQuestions) {
  try {
      // Fetch all roles from the database
      const roles = await query('SELECT id, title FROM role');

      // Prompt the user to select the role to delete
      const { roleId } = await inquirer.prompt([
          {
              type: 'list',
              message: 'Select the role to delete:',
              name: 'roleId',
              choices: roles.map(role => ({
                  name: role.title,
                  value: role.id,
              })),
          },
      ]);

      // Delete the selected role from the database
      const sql = `DELETE FROM role WHERE id = ?`;
      await query(sql, [roleId]);
      console.log('Role deleted successfully.');

      // Prompt the user for the next action
      inquirer.prompt([
          {
              type: 'list',
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
  } catch (error) {
      console.error('Error deleting role:', error);
  }
}


// Function to delete an employee by their ID
async function deleteEmployee(promptQuestions) {
  try {
      // Fetch all employees from the database
      const employees = await query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee');

      // Prompt the user to select the employee to delete
      const { employeeId } = await inquirer.prompt([
          {
              type: 'list',
              name: 'employeeId',
              choices: employees.map(employee => ({
                  name: employee.full_name,
                  value: employee.id,
              })),
          },
      ]);

      // Delete the selected employee from the database
      const sql = `DELETE FROM employee WHERE id = ?`;
      await query(sql, [employeeId]);
      console.log('Employee deleted successfully.');

      // Prompt the user for the next action
      inquirer.prompt([
          {
              type: 'list',
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
  } catch (error) {
      console.error('Error deleting employee:', error);
  }
}

// Export the functions to be used in other files
module.exports = {
    deleteDepartment,
    deleteRole,
    deleteEmployee
};
