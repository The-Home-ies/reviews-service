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
    address VARCHAR(200) NOT NULL,
    owner VARCHAR(200) NOT NULL,
    PRIMARY KEY(listing_id)
);

CREATE TABLE customers (
    customer_id SERIAL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(200) NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY(customer_id),
    CONSTRAINT fk_listing
        FOREIGN KEY (listing_id)
            REFERENCES listings(listing_id)
);

CREATE TABLE reviews (
    review_id SERIAL,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    text VARCHAR(500) NOT NULL,
    cleanliness INT,
    communication INT,
    check_in INT,
    accuracy INT,
    location INT,
    value INT,
    author_id INT,
    listing_id INT,
    PRIMARY KEY (review_id),
    CONSTRAINT fk_author
        FOREIGN KEY (author_id)
            REFERENCES customers(customer_id),
    CONSTRAINT fk_listing
        FOREIGN KEY (listing_id)
            REFERENCES listings(listing_id)
);

\COPY listings FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/postgresCsvData/listings.csv' DELIMITER ',' CSV HEADER;
\COPY customers FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/postgresCsvData/customers.csv' DELIMITER ',' CSV HEADER;
\COPY reviews FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/postgresCsvData/reviews.csv' DELIMITER ',' CSV HEADER;

-- SELECT * FROM listings;
-- SELECT * FROM customers;
-- SELECT * FROM reviews;