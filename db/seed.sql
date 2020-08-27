USE employee_db;

insert into departments (name)
values ("Entertainment"), ("Service"), ("Security");

insert into roles (title, salary, department_id)
values ("Dancer", 20000, 1), ("DJ", 35000, 1), ("Bartender", 25000, 2), ("Bouncer",  30000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values 
("Kristyl", "Light", 1, 1),
("Cristal", "Myth", 1, 1),
("Chocolate", "Barr", 1, 1),
("Treasure", "Best", 1, 1),
("Jazmine", "Pedals", 1, 1),
("Tammy", "Thornton", 1, 1),
("John", "Holmberg", 2, 1),
("Skril", "Lex", 2, 1),
("Levi", "Sumoe", 2, 1),
("Brenda", "Baddie", 3, 2),
("Jaime", "Smith", 3, 2),
("MaryLou", "Snyder", 3, 2),
("Rick", "Rude", 4, 3),
("John", "Cena", 4, 3),
("Dwayne", "Johnson", 4, 3);