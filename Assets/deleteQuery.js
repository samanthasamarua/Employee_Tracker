const query = require('./db');
const inquirer = require('inquirer');

// Function to delete a department 
async function deleteDepartment(promptQuestions) {
  try {
     
      const departments = await query('SELECT * FROM department');


      const departmentChoices = departments.map(department => ({
          name: department.name,
          value: department.id,
      }));

      
      const { departmentId } = await inquirer.prompt([
          {
              type: 'list',
              message: 'Select a department to delete:',
              name: 'departmentId',
              choices: departmentChoices,
          },
      ]);

     
      const sql = `DELETE FROM department WHERE id = ?`;
      await query(sql, [departmentId]);
      
      console.log('Department deleted successfully.');

      const { NextAction } = await inquirer.prompt([
          {
              type: 'list',
              name: 'NextAction',
              choices: ['Return to Main Menu', 'Quit'],
          },
      ]);

      // Handle the user's choice
      if (NextAction === 'Return to Main Menu') {
          promptQuestions(); 
      } else {
          console.log('Exiting application...');
          process.exit(0); 
      }

  } catch (error) {
      console.error('Error deleting department:', error);
  }
}

// Function to delete a role based on user selection
async function deleteRole(promptQuestions) {
  try {
     
      const roles = await query('SELECT id, title FROM role');

    
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

    
      const sql = `DELETE FROM role WHERE id = ?`;
      await query(sql, [roleId]);
      console.log('Role deleted successfully.');

      inquirer.prompt([
          {
              type: 'list',
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
  } catch (error) {
      console.error('Error deleting role:', error);
  }
}


// Function to delete an employee
async function deleteEmployee(promptQuestions) {
  try {

      const employees = await query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee');
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

      const sql = `DELETE FROM employee WHERE id = ?`;
      await query(sql, [employeeId]);
      console.log('Employee deleted successfully.');

      inquirer.prompt([
          {
              type: 'list',
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
