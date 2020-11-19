-- Drops employee_DB if exists--
Drop Database If Exists employee_DB;
--Creates employee_DB if doesn't exist--
Create Database employee_DB;
--Uses Employee_DB--
Use employee_DB;

--Creates table for department--
create table Department (
    id int NOT NULL AUTO_INCREMENT,
  person varchar(30) NOT NULL,
  PRIMARY KEY (id)

);

--creates table for roles--
create table Roles (
id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary Decimal,
  department_id int,
  PRIMARY KEY (id)

);

--Creates Employees table--
Create Table Employees (
      id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30),
  last_name varchar(30),
  role_id int,
  manager_id int,
  PRIMARY KEY (id)

);

select * from employee
inner join role on employee.role_id = role.id
inner join department on role.department_id = department.id;


