const inquirer = require(inquirer);
const connection = require("./db/connection");

const initQ = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: ["View", "Add", "Edit"]
  },
  {
    type: "list",
    name: "view",
    message: "What would you like to view?",
    choices: ["Departments", "Roles", "Employees"]
  },
  {
    type: "list",
    name: "add",
    message: "What would you like to add?",
    choices: ["Department", "Role", "Employee"]
  },
  {
    type: "list",
    name: "edit",
    message: "What would you like to edit?",
    choices: ["Department", "Role", "Employee"]
  },
];

function view() {

}

function add() {

}

function edit() {

}
