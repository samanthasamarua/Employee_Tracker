const query = require('./db');
const inquirer = require('inquirer');


// Function to update employee role
async function updateEmployeeRole() {
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

        const answers = await inquirer.prompt([
            {
                type: 'list',
                message: 'Select the employee to update:',
                name: 'employeeId',
                choices: employeeChoices,
            },
            {
                type: 'list',
                message: "Select the employee's new role:",
                name: 'newRoleId',
                choices: roleChoices,
            },
        ]);

        const { employeeId, newRoleId } = answers;

        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        await query(sql, [newRoleId, employeeId]);
        console.log('Employee role updated successfully!');
      
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
}

module.exports = { updateEmployeeRole };
