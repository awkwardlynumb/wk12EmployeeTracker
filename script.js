const inquirer = require("inquirer");
const connection = require("./db/connection");

const initQ = [
  {
    type: "rawlist",
    name: "task",
    message: "What would you like to do?",
    choices: ["View", "Add", "Edit"],
  },
];

const endQ = [
  {
    type: "list",
    name: "continue",
    message: "Would you like to do something else?",
    choices: ["Yes", "No"],
  },
];
function start() {
  inquirer.prompt(initQ[0]).then((answer) => {
    if (answer.task === "View") {
      view();
    } else if (answer.task === "Add") {
      add();
    } else if (answer.task === "Edit") {
      edit();
    } else {
      console.log("You broke it :(");
    }
  });
}

start();

function view() {
  inquirer
    .prompt({
      type: "list",
      name: "view",
      message: "What would you like to view?",
      choices: ["Departments", "Roles", "Employees"],
    })
    .then((answer) => {
      connection.query(
        "SELECT * from ?",
        [answer.view.toLowerCase()],
        function (err, res) {
          if (err) throw err;
          console.log(res);
        }
      );
      end();
    });
}

function add() {
  inquirer
    .prompt({
      type: "list",
      name: "addWhat",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((answer) => {
      switch (answer) {
        case "Department":
          addDepartment();
          break;
        case "Role":
          addRole();
          break;
        case "Employee":
          addEmployee();
          break;
      }
    });
}

function edit() {
  inquirer
    .prompt({
      type: "list",
      name: "editWhat",
      message: "what would you like to edit?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((answer) => {
      switch (answer) {
        case "Department":
          editDepartment();
          break;
        case "Role":
          editRole();
          break;
        case "Employee":
          editEmployee();
          break;
      }
    });
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "newDep",
    message: "Please enter a name for the new department"
  }).then(answer => {
    connection.query("insert into departments (name) values (?)", [answer], function(err){
      if (err) throw err;
      console.log("Department added successfully, new department list:")
      connection.query("select all from departments")
    })
    end()
  })
}

function addRole() {
  inquirer.prompt({
    type: "input",
    name: "title",
    message: "Please enter a title for the new role"
  },{
    type: "input",
    name: "salary",
    message: "Please enter a salary"
  },{
    type: "input",
    name: "dept",
    message: "Please enter a department"
  })
}

function end() {
  inquirer.prompt(endQ).then((answer) => {
    if (answer.continue === "Yes") {
      start();
    } else if (answer.continue === "No") {
      console.log("Bye");
      connection.end;
    }
  });
}
