require("dotenv").config();
const mysql= require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");

var connection = mysql.createConnection({
    host: "localhost",
  
    // My port; if not 3306
    port: 3030,
  
    // MY username
    user: "root",
  
    // MY password
    password: "Pathwill#1",
    database: "employee_DB"
  });

  connection.connect(function(err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      startTracking();
  })
function startTracking() {

    inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to choose?",
    choices: ["View all employees",
    "View all departments",
    "View all employees by department?",
    "View all roles",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update employee role",
    "Done"

]}).then(function (answer) {
    switch(answer.action) {
        case "View all employees": allEmployees();
        case "View all departments": allDeptments();
        case "View all employees by departments": employeeDepartments();
        case "View all roles": allRoles();
        case "Add a department": addDepartment();
        case "Add a role": addRole();
        case "Add an employee": addEmployee();
        case "Update employee role": updateRole();
        case "Done": connection.end();

    }

});
    }
function allEmployees() {
    var query = "SELECT (title) FROM ROLES";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        

    })
    startTracking();
}

function allDeptments() {
     connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
         
})
startTracking();
}

function allRoles() {
connection.query("SELECT * FROM role", function (err, res){
    if (err) throw err;
    console.table(res);
    startTracking();
})    
}

function employeeDepartments() {
    var query = "SELECT employee.first_name, employee.last_name, employee.RoleID";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table(res);
        startTracking();
    
})
}


function addDepartment() {
    inquirer.prompt(
        [
            {
                name:"department",
                type:"input",
                message:"Name of the department?"
            },
        ]).then(function(answer) {
            console.log(department);
            connection.query("INSERT INTO role SET ?"),{
               departmentName:  answer.department 
            },
          function(err,res) {
                if(err) throw err;
             startTracking();   
            }
        })
}

function addRole() {
    inquirer.prompt( 
        [
            {
                name: "role",
                type: "input",
                message: "What role would like added?"
            },
            {
                name: "salary",
                type: "input",
                message:"What is the salary?"
            }
        ]).then(function(answer) {
            console.log(answer.role);
            console.log(answer.salary);
            connection.query("INSERT INTO role SET ?",{
                title: answer.role,
                salary: answer.salary,
            }, function(err, res) {
                if(err) throw err;
                startTracking();
            }
            )
        })
};

function addEmployee() {
    inquirer.prompt(
        [
            {
                name: "employeeFirst",
                type: "input",
                message: "What's the employee first name?",
            },
            {
               name: "employeeLast",
               type: "input",
               message: "What's the employee last name?" 
            },
            {
                name: "employeeRoleID",
                type: "input",
                message: "What's the employees role ID?"
            },
        ]).then(function(answer) {
            console.log(answer.employeeFirst);
            console.log(answer.employeeLast);
            console.log(answer.employeeRoleID);
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.employeeFirst,
                last_name: answer.employeeLast,
                role_id: answer.employeeRoleID
            }, 
            function(err,res){
                if(err) throw err;
                startTracking();
            })
            
        })
};














  