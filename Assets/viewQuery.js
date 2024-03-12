const query = require('./db'); 

async function viewDepartments() {
  try {
      const sql = `SELECT id, name AS Department FROM department`;
      const res = await query(sql);
      console.table(res);
  } catch (err) {
      console.error(err);
  }
}
async function viewRoles () {

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

};

async function viewEmployees() {
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

};


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees
};