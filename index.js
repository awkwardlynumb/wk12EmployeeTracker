const inquirer = require("inquirer");
const connection = require("./db/connection");
const cTable = require("console.table");

const initQ = {
  type: "rawlist",
  name: "task",
  message: "What would you like to do?",
  choices: ["View", "Add", "Edit"],
};

const endQ = {
  type: "list",
  name: "continue",
  message: "Would you like to do something else?",
  choices: ["Yes", "No"],
};

//done
async function start() {
  const answer = await inquirer.prompt(initQ);
  if (answer.task === "View") {
    view();
  } else if (answer.task === "Add") {
    add();
  } else if (answer.task === "Edit") {
    edit();
  } else {
    console.log("You broke it :(");
  }
}

start();

//done
function view() {
  inquirer
    .prompt({
      type: "list",
      name: "view",
      message: "What would you like to view?",
      choices: [`Departments`, `Roles`, `Employees`],
    })
    .then((answer) => {
      let queryString = "";
      switch (answer.view) {
        case "Departments":
          queryString = "select * from departments";
          break;
        case "Roles":
          queryString =
            "select roles.id, roles.title, roles.salary, departments.name as department from roles left join departments on departments.id = roles.department_id;";
          break;
        case "Employees":
          queryString =
            "select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name as department, concat(manager.first_name, ' ', manager.last_name) as manager from employees left join roles on employees.role_id = roles.id left join departments on departments.id = roles.department_id left join employees manager on employees.manager_id = manager.id;";
      }
      connection.query(queryString, function (err, res) {
        if (err) throw err;
        console.table(res);
        end();
      });
    });
}

//done
function add() {
  inquirer
    .prompt({
      type: "list",
      name: "addWhat",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((answer) => {
      switch (answer.addWhat) {
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

//done
function edit() {
  inquirer
    .prompt({
      type: "list",
      name: "editWhat",
      message: "what would you like to edit?",
      choices: ["Department", "Role", "Employee"],
    })
    .then((answer) => {
      switch (answer.editWhat) {
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
  inquirer
    .prompt({
      type: "input",
      name: "newDep",
      message: "Please enter a name for the new department",
    })
    .then((answer) => {
      connection.query(
        "insert into departments (name) values (?)",
        [answer.newDep],
        function (err) {
          if (err) throw err;
          console.log("Department added successfully");
          end();
        }
      );
    });
}

// Done
async function addRole() {
  const departmentsArr = await connection.query("select * from departments");
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Please enter a title for the new role",
    },
    {
      type: "input",
      name: "salary",
      message: "Please enter a salary",
    },
    {
      type: "list",
      name: "dept",
      message: "Please select a department",
      choices: departmentsArr,
    },
  ]);
  const deptId = await connection.query(
    "select id from departments where name = '" + answers.dept + "';"
  );
  connection.query(
    "insert into roles (title, salary, department_id) values (?, ?, ?)",
    [answers.title, answers.salary, deptId[0].id],
    function (err) {
      if (err) console.log(err);
      console.log("Role added successfully");
      end();
    }
  );
}

function addEmployee() {
  // select all from roles
  // select all from employees so you have a list of managers to choose from
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "Please enter new employee's first name",
      },
      {
        type: "input",
        name: "last",
        message: "Please enter last name",
      },
      {
        type: "list",
        name: "role",
        message:
          "Please select employee's position (1-dancer 2-DJ 3-bartender 4-bouncer",
        choices: ["1", "2", "3"],
      },
      {
        type: "list",
        name: "manager",
        message: "Please enter their manager's ID (1-Day 2-Night 3-Weekend)",
        choices: ["1", "2", "3"],
      },
    ])
    .then((answers) => {
      connection.query(
        "insert into employees (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
        [
          answers.first,
          answers.last,
          parseInt(answers.role),
          parseInt(answers.manager),
        ],
        function (err) {
          if (err) throw err;
          console.log("The new employee has been added successfully");
          end();
        }
      );
    });
}

// Done
async function editDepartment() {
  const deptArr = await connection.query("select * from departments");
  const answers = await inquirer.prompt([
    {
      type: "rawlist",
      name: "dept",
      message: "Which department would you like to edit?",
      choices: deptArr,
    },
    {
      type: "input",
      name: "newValue",
      message: "What would you like to change the department name to?",
    },
  ]);
  const deptId = await connection.query(
    "select id from departments where name = '" + answers.dept + "';"
  );
  connection.query(
    "update departments set name = ? where id = ?",
    [answers.newValue, deptId[0].id],
    (err) => {
      if (err) throw err;
      console.log("Successfully updated this department!");
    }
  );
}

function end() {
  inquirer.prompt(endQ).then((answer) => {
    if (answer.continue === "Yes") {
      start();
    } else if (answer.continue === "No") {
      console.log("Bye");
      connection.end();
    }
  });
}
