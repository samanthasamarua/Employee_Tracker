// Added Dependencies
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

// Import the connection object
const sequelize = require('./config/connection');

const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'process.env',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db.`)
);


// Prompt questions
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select a category',
      name: 'Question',
      choices: ['Department','Roles','Employees'],
    },
    
  ])
  .then((answers) => {
    const {choices} = answers;

    if (choices === "Department")
    inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'Question',
        choices: ['View all Departments','Add Departments','Delete Department', 'Update Department'],
      },

    ])

    if (choices === "Roles")
    inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'Question',
        choices: ['View all Roles','Add Roles','Delete Roles', 'Update Roles'],
      },

    ])

    if (choices === "Employees")
    inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'What would you like to do?',
        name: 'Question',
        choices: ['View all employees','Add employees','Delete employees', 'Update employees'],
      },

    ])
  });
