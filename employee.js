// Packages

const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

// Connection to database

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Acegunner145",
  database: "cms_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  initiation();
});

// Initiation Function

async function initiation() {
  const title = await base();
  if (title.base === "Add something") {
    const add = await addSomething();
    if (add.add === "Department") {
      const department = await departmentAdd();
      addDepartment(department);
    } else if (add.add === "Role") {
      const role = await roleAdd();
      addRole(role);
    } else {
      const employee = await employeeAdd();
      addEmployee(employee);
    }
  } else if (title.base === "View something") {
    const view = await viewRequest();
    viewSomething(view);
  } else if (title.base === "Update Employee roles") {
    const update = await queryPromise("SELECT * FROM employee_role");
    const updateArray = await updateWhere(update);
    const updatePro = await updatePrompt();
    const updateSpec = await updateSpecific(updatePro);
    updateSomething(updateSpec, updateArray);
  } else {
    console.clear();
    return;
  }
}
// This the main function where all the magic happens. Users are prompted a series
// of questions within this function and basically makes everything happen asynchronously.

// Inquirer prompts

function base() {
  return inquirer.prompt([
    {
      type: "list",
      name: "base",
      message: "What would you like to do?",
      choices: [
        "Add something",
        "View something",
        "Update Employee roles",
        "Exit"
      ]
    }
  ]);
}
// Base question which prompts user what they would like to do.

// Add something inquirer prompts

function addSomething() {
  return inquirer.prompt([
    {
      type: "list",
      name: "add",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"]
    }
  ]);
}
// Question which prompts the user what they would like to add.

function departmentAdd() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department name?"
    }
  ]);
}
// Prompt which lets the user input a department name.

function roleAdd() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the role title?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is their salary?"
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the department ID?"
    }
  ]);
}
// Prompt which allows users to add the details into the role.

function employeeAdd() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the employee title?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is their salary?"
    }
  ]);
}
// Prompt which allows users to add specific details into their employees.

// View something inquirer prompts

function viewRequest() {
  return inquirer.prompt([
    {
      type: "list",
      name: "table",
      message: "What would you like to view?",
      choices: ["department", "employee_role", "employee"]
    }
  ]);
}
// Prompt which let users pick which table they would like to view.

// Update something inquirer prompt

function queryPromise(queryString) {
  return new Promise(function(resolve, reject) {
    connection.query(queryString, function(err, result) {
      if (err) {
        return reject(err);
      }
      let emptyArr = [];
      for (let i = 0; i < result.length; i++) {
        emptyArr.push(result[i].title);
      }
      resolve(emptyArr);
    });
  });
}
// Function which returns a promise that resolves an array filled with all
// the employee role titles.

function updateWhere(obj) {
  return inquirer.prompt([
    {
      type: "list",
      name: "title",
      message: "What role would you like to update?",
      choices: obj
    }
  ]);
}
// Function which prompts users which role they would like to update.

function updatePrompt() {
  return inquirer.prompt([
    {
      type: "list",
      name: "update",
      message: "What specifically would you like to update?",
      choices: ["Title", "Salary", "Department ID"]
    }
  ]);
}
// Function which prompts user what specifically within the employee
// role they would like to update.

function updateSpecific(obj) {
  if (obj.update === "Title") {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Input new title"
      }
    ]);
  } else if (obj.update === "Salary") {
    return inquirer.prompt([
      {
        type: "input",
        name: "salary",
        message: "Input new salary"
      }
    ]);
  } else {
    return inquirer.prompt([
      {
        type: "input",
        name: "department_id",
        message: "Input new department ID"
      }
    ]);
  }
}
// Function which prompts the user to input specifics into whatever they want
// to update and returns that object

// Functions For Adding Employees

function addDepartment(obj) {
  console.log("Inserting a new department");
  connection.query("INSERT INTO department SET ?", obj, function(err, res) {
    if (err) throw err;
    console.log(res.affectedRows + " department inserted!\n");
  });
  connection.query("SELECT * from department", function(err, res) {
    if (err) throw err;
    const newTable = table.getTable(res);
    console.log(newTable);
  });
  console.clear();
  initiation();
}
// Function which inserts a new department into the database

function addRole(obj) {
  console.log("Inserting a new role");
  connection.query("INSERT INTO employee_role SET ?", obj, function(err, res) {
    if (err) throw err;
    console.log(`${res.affectedRows} role inserted! \n`);
  });
  connection.query("SELECT * from employee_role", function(err, res) {
    if (err) throw err;
    const newTable = table.getTable(res);
    console.log(newTable);
  });
  console.clear();
  initiation();
}
// Function which adds the role into the database

function addEmployee(obj) {
  console.log("Inserting a new employee!");
  connection.query("INSERT INTO employee SET ?", obj, function(err, res) {
    if (err) throw err;
    console.log(`${res.affectedRows} employee inserted! \n`);
  });
  connection.query("SELECT * from employee", function(err, res) {
    if (err) throw err;
    const newTable = table.getTable(res);
    console.log(newTable);
  });
  console.clear();
  initiation();
}
// Function which adds an employee into the database

// View something functions

function viewSomething(obj) {
  console.log("Viewing requested table!");
  connection.query(`SELECT * FROM ${obj.table}`, function(err, res) {
    if (err) throw err;
    const newTable = table.getTable(res);
    console.log(newTable);
  });
  console.clear();
  initiation();
}
// Function which allows users to view tables

// Update employee role functions

function updateSomething(obj1, obj2) {
  console.log("Updating employee roles!");
  connection.query("UPDATE employee_role SET ? WHERE ?", [obj1, obj2], function(
    err,
    res
  ) {
    if (err) throw err;
  });
  connection.query("SELECT * FROM employee_role", function(err, res) {
    if (err) throw err;
    const newTable = table.getTable(res);
    console.log(newTable);
  });
  console.clear();
  initiation();
}
// Function which updates employee_role table within the database
