CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE storefront
(
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT default 0,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL (10, 2),
  stock_quantity INT default 0,
  PRIMARY KEY (id)

);


ALTER TABLE storefront
MODIFY COLUMN price DECIMAL (10,2)

INSERT INTO storefront (item_id, product_name, department_name, price, stock_quantity) 
values (001, "Golden Buddha", "Religion", 1200.00, 2),(002, "Hover Board", "Sports", 999, 5), (003, "Pokéball", "Hunting", 50.00, 10), (004, "Dancing Hamster", "Pets", 20.00, 5), (005, "Pink Pants", "Clothes", 35.00, 4),
(006, "Ion Blaster", "Weapons", 500.00, 3), (007, "1968 Charger", "Cars", 30000.00, 1), (008, "Wooden Table", "Furniture", 300.00, 8),
(009, "Magic Wand", "Sorcery", 90.00, 6), (010, "A Cool Hat", "Accessories", 10.00, 1)




DELETE FROM storefront;

DROP TABLE storefront;