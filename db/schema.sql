create database employees;
use employees;
create table department (
    id int auto_increment,
    name varchar,
    primary key (id)
);

create table role (
    id int auto_increment,
    title varchar,
    salary int,
    department int,
    primary key (id)
);

create table employee (
    id int auto_increment,
    first_name varchar(20),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
)

