CREATE DATABASE database_petshop;

USE database_petshop;

CREATE TABLE products(
    id INT (11) NOT NULL,
    productName VARCHAR (60) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price INT (11) NOT NULL, 
    stock TINYINT (1) 
); 

ALTER TABLE products
    ADD PRIMARY KEY (id);

ALTER TABLE products
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT;

CREATE TABLE customer(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customerName VARCHAR (60) NOT NULL,
    password VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    address VARCHAR(200) NOT NULL
);

CREATE TABLE purchases(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userid INT (11) NOT NULL,
    productId INT (11) NOT NULL,
    checkoutId INT (11) NOT NULL,
    deliveredId INT (11),
    created_at timestamp NOT NULL DEFAULT current_timestamp, 
    CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(id),
    CONSTRAINT fk_checkout FOREIGN KEY (checkoutId) REFERENCES checkout(id),
    CONSTRAINT fk_delivered FOREIGN KEY (deliveredId) REFERENCES delivered(id)
);

CREATE TABLE checkout(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    paid TINYINT (1), 
    notified TINYINT (1), 
    userAddress VARCHAR(200) NOT NULL
);

CREATE TABLE delivered(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    delivered TINYINT (1), 
    checkoutId INT (11) NOT NULL,
    comments VARCHAR(200)
);


CREATE TABLE contact(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    comments VARCHAR (200) NOT NULL,
)
