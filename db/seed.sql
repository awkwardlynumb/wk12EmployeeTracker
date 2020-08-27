USE employees;

insert into departments (name)
values ("Entertainment"), ("Service"), ("Security");

insert into roles (title, salary, department_id)
values ("Dancer", 20000, 1), ("DJ", 35000, 1), ("Bartender", 25000, 2), ("Bouncer",  30000, 3);

insert into employees (first_name, last_name, role_id, manager_id)
values 
("Kristyl", "Light", 1, 15),
("Cristal", "Myth", 1, 13),
("Chocolate", "Barr", 1, 14),
("Treasure", "Best", 1, 14),
("Jazmine", "Pedals", 1, 13),
("Tammy", "Thornton", 1, 15),
("John", "Holmberg", 2, 13),
("Skril", "Lex", 2, 14),
("Levi", "Sumoe", 2, 15),
("Brenda", "Baddie", 3, 15),
("Jaime", "Smith", 3, 13),
("MaryLou", "Snyder", 3, 14),
("Rick", "Rude", 4, 15),
("John", "Cena", 4, 15),
("Dwayne", "Johnson", 4, 15);