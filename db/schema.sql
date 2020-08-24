create database employees;
use employees;
create table departments (
    id int auto_increment,
    name varchar(15),
    primary key (id)
);

create table roles (
    id int auto_increment,
    title varchar,
    salary int,
    department_id int,
    primary key (id)
);

create table employees (
    id int auto_increment,
    first_name varchar(20),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
)

