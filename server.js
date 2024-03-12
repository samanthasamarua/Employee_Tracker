// Added Dependencies
const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');


const { viewDepartments, viewRoles, viewEmployees } = require('./Assets/viewQuery'); // Require the viewquery module
const { addDepartment, addRole, addEmployee } = require('./Assets/addQuery');
const { updateEmployeeRole } = require('./Assets/updateQuery');
const { deleteDepartment, deleteRole, deleteEmployee } = require('./Assets/deleteQuery');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


sequelize.sync({ force: false }).then(() => {
  // Call app.listen after all routes and middleware are defined
  app.listen(PORT, () => console.log('Now listening'));
});

function promptQuestions() {
  console.log('Welcome to the Employee Tracker')
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select one of the following options:',
        name: 'Prompts',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees', 
          'Add a Department',
          'Add a Role', 
          'Add an Employee',
          'Delete a Department',
          'Delete a Role', 
          'Delete an Employee', 
          'Update an Employee Role',
          'Return to Main Menu', 
          'Quit',
        ],
      },
    ])
    .then(async (answers) => {
      const { Prompts } = answers;
  
      if (Prompts.includes('View All Departments')) {
          viewDepartments();
          inquirer
          .prompt([
            {
              type: 'list',
              name: 'NextAction',
              choices: [
                'Return to main menu',
                'Quit',
              ],
            },
          ])
          .then((answer) => {
            if (answer.NextAction === 'Execute another action') {
              promptQuestions(); // Call the function to prompt the user again
            } else if (answer.NextAction === 'Return to main menu') {
              promptQuestions(); // Call the function to display the main menu
            } else {
              console.log('Exiting application...');
              process.exit(0); // Quit the application
            }
          });
      } else if (Prompts.includes('View All Roles')) {
          viewRoles();
          inquirer
          .prompt([
            {
              type: 'list',
              name: 'NextAction',
              choices: [
                'Return to main menu',
                'Quit',
              ],
            },
          ])
          .then((answer) => {
            if (answer.NextAction === 'Execute another action') {
              promptQuestions(); // Call the function to prompt the user again
            } else if (answer.NextAction === 'Return to main menu') {
              promptQuestions(); // Call the function to display the main menu
            } else {
              console.log('Exiting application...');
              process.exit(0); // Quit the application
            }
          });
      } else if (Prompts.includes('View All Employees')) {
          viewEmployees();
          inquirer
          .prompt([
            {
              type: 'list',
              name: 'NextAction',
              choices: [
                'Return to main menu',
                'Quit',
              ],
            },
          ])

          .then((answer) => {
            if (answer.NextAction === 'Execute another action') {
              promptQuestions(); // Call the function to prompt the user again
            } else if (answer.NextAction === 'Return to main menu') {
              promptQuestions(); // Call the function to display the main menu
            } else {
              console.log('Exiting application...');
              process.exit(0); // Quit the application
            }
          });

      } else if (Prompts.includes('Add a Department')) {
          addDepartment(promptQuestions);
   
      } else if (Prompts.includes('Add a Role')) {
          addRole(promptQuestions); 
          
      } else if (Prompts.includes('Add an Employee')) {
          addEmployee(promptQuestions);

      } else if (Prompts.includes('Delete a Department')) {
        deleteDepartment(promptQuestions);

      } else if (Prompts.includes('Delete a Role')) {
        deleteRole(promptQuestions);

      } else if (Prompts.includes('Delete an Employee')) {
        deleteEmployee(promptQuestions);

      } else if (Prompts.includes('Update an Employee Role')) {
          await updateEmployeeRole(); 
          inquirer
          .prompt([
            {
              type: 'list',
              name: 'NextAction',
              choices: [
                'Return to main menu',
                'Quit',
              ],
            },
          ])
          .then((answer) => {
            if (answer.NextAction === 'Return to main menu') {
              promptQuestions(); // Call the function to prompt the user again
            } else {
              console.log('Exiting application...');
              process.exit(0); // Quit the application
            }
          });
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
  
};
promptQuestions();

module.exports = { promptQuestions };