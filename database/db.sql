CREATE DATABASE database_petshopTest;

USE database_petshopTest;

CREATE TABLE category(
    id INT (11) NOT NULL AUTO_INCREMENT,
    category VARCHAR(60) NOT NULL,
    PRIMARY KEY (id, category)
);
ALTER TABLE category ADD UNIQUE INDEX(category);

CREATE TABLE products_type(
    id INT (11) NOT NULL AUTO_INCREMENT,
    productType VARCHAR (60) NOT NULL,
    category VARCHAR(60) NOT NULL,
    PRIMARY KEY (id, productType, category),
    CONSTRAINT fk_category_pt FOREIGN KEY (category) REFERENCES category(category)
);
ALTER TABLE products_type ADD UNIQUE INDEX(productType, category);

CREATE TABLE products(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR (60) NOT NULL,
    typeId INT (11) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price INT (11) NOT NULL, 
    stock TINYINT (1), 
    CONSTRAINT fk_products_type FOREIGN KEY (typeId) REFERENCES products_type(id)
); 

CREATE TABLE customer(
    id INT (11) NOT NULL AUTO_INCREMENT,
    customerName VARCHAR (60) NOT NULL,
    password VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    PRIMARY KEY (id, email)
);
ALTER TABLE customer ADD UNIQUE INDEX(email);

CREATE TABLE address(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR (60) NOT NULL,
    number INT (11) NOT NULL,
    CP INT (11) NOT NULL, 
    city VARCHAR (60) NOT NULL,
    state VARCHAR (60) NOT NULL,
    district VARCHAR (60) NOT NULL,
    customerId INT (11) NOT NULL,
    CONSTRAINT fk_customer FOREIGN KEY (customerId) REFERENCES customer(id)
);

CREATE TABLE checkout(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    notified TINYINT (1), 
    addressId INT (11) NOT NULL, 
    paid TINYINT (1) NOT NULL,
    CONSTRAINT fk_address FOREIGN KEY (addressId) REFERENCES address(id)
);

CREATE TABLE purchases(
    id INT (11) NOT NULL AUTO_INCREMENT,
    customerId INT (11) NOT NULL,
    productId INT (11) NOT NULL,
    checkoutId INT (11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp, 
    valid TINYINT (1) NOT NULL,
    PRIMARY KEY (id, checkoutId),
    CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(id),
    CONSTRAINT fk_checkout FOREIGN KEY (checkoutId) REFERENCES checkout(id), 
    CONSTRAINT fk_customer_purchase FOREIGN KEY (customerId) REFERENCES customer(id)
);
ALTER TABLE purchases ADD UNIQUE INDEX(checkoutId);

CREATE TABLE delivered(
    id INT (11) NOT NULL AUTO_INCREMENT,
    purchaseId INT (11) NOT NULL,
    delivered TINYINT (1), 
    comments VARCHAR(200), 
    PRIMARY KEY (id, purchaseId),
    CONSTRAINT fk_purchases FOREIGN KEY (purchaseId) REFERENCES purchases(id)
);
ALTER TABLE delivered ADD UNIQUE INDEX(purchaseId);

CREATE TABLE contact(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    comments VARCHAR (200) NOT NULL
)
DELIMITER //
CREATE PROCEDURE createProduct(category_fp VARCHAR(60), productType_fp VARCHAR (60),productName_fp VARCHAR (60), description_fp VARCHAR(200), price_fp INT (11), stock_fp TINYINT (1))
    BEGIN
    DECLARE fk_id INT;
        INSERT IGNORE INTO category (category) VALUES(category_fp);
        INSERT IGNORE INTO products_type(productType, category) VALUES(productType_fp, category_fp);
        SELECT id INTO fk_id FROM products_type where productType = productType_fp && category = category_fp;
        INSERT INTO products(productName, typeId, description, price, stock) VALUES(productName_fp, fk_id, description_fp, price_fp, stock_fp);
    END 
//


 CALL createProduct(category,productType, productName, description, price, stock);
 
 CALL createProduct('perros','higiene', 'Shampoo Grisi', 'Shampoo Antipulgas Grisi PPT 400 ml', 100, 1);

DELIMITER //
CREATE PROCEDURE registro(nombre_r VARCHAR(30), apellidos_r VARCHAR(50),  usuario_r VARCHAR (30), correoElectronico_r VARCHAR (100), calle_r VARCHAR(80), ciudad_r VARCHAR(50))
    BEGIN
    DECLARE fk_id INT;
        INSERT IGNORE INTO cliente (nombre, apellidos, usuario, correoElectronico) VALUES (nombre_r, apellidos_r, usuario_r, correoElectronico_r);
        SELECT id INTO fk_id FROM cliente where usuario = usuario_r && correoElectronico = correoElectronico_r;
        INSERT IGNORE INTO direcciones(cid, calle, ciudad) VALUES (fk_id, calle_r, ciudad_r)
    END
    //

    CALL registro(nombre, apellidos, usuario, correoElectronico, calle, ciudad);

NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER 

DELIMITER //  
CREATE PROCEDURE getCount() 
BEGIN
SELECT 
   (select count(*) from products) as productos,
   (select count(*) from category) as categorias 
   ;
END
//

DELIMITER //  
CREATE PROCEDURE getCount() 
BEGIN
SELECT 
   ( select count(*) from usuario) as cantidad,
   ( select count(p.estatus) from Pago 
     where p.estatus="Pagado") as pagados 
   ;
END
//