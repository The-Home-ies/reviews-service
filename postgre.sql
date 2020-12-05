/*  Execute this file from the postgres shell by typing:
 *    \i postgre.sql;
 *  to create the database and the tables.
 */

\c dvdrental;

DROP DATABASE IF EXISTS listing_reviews;

CREATE DATABASE listing_reviews WITH OWNER = rickymarasigan;

\c listing_reviews

CREATE SCHEMA listing_reviews;

CREATE TABLE listings (
    listing_id SERIAL,
    address VARCHAR(50) NOT NULL,
    owner VARCHAR(50) NOT NULL,
    PRIMARY KEY(listing_id)
);

CREATE TABLE customers (
    customer_id SERIAL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(50) NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY(customer_id)
);

CREATE TABLE reviews (
    review_id SERIAL,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    text VARCHAR(200) NOT NULL,
    cleanliness INT,
    communication INT,
    check_in INT,
    accuracy INT,
    location INT,
    value INT,
    PRIMARY KEY (review_id),
    author_id INT,
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
            REFERENCES customers(customer_id)
);

INSERT INTO customers (
        name,
        email,
        avatar_url,
        listing_id
    ) VALUES (
            'Ricky Marasigan',
            'rickysoliman@gmail.com',
            'https://image.url',
            1
);

INSERT INTO customers (
        name,
        email,
        avatar_url,
        listing_id
    ) VALUES (
            'Suzzy Win',
            'suzinwin@bu.edu',
            'https://image.url',
            2
);

INSERT INTO reviews (
        posting_date,
        text,
        cleanliness,
        communication,
        check_in,
        accuracy,
        location,
        value,
        author_id
    ) VALUES (
            '2020-12-24',
            'This was a nice place to stay.',
            5,
            5,
            5,
            5,
            5,
            5,
            1
);

INSERT INTO reviews (
        posting_date,
        text,
        cleanliness,
        communication,
        check_in,
        accuracy,
        location,
        value,
        author_id
    ) VALUES (
            '2020-12-24',
            'This was a nice place to stay.',
            5,
            5,
            5,
            5,
            5,
            5,
            2
);

SELECT * FROM customers;
SELECT * FROM reviews;