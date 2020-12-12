DROP KEYSPACE IF EXISTS reviews;
CREATE KEYSPACE IF NOT EXISTS reviews
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE reviews;

CREATE TABLE listings (
  listing_id int,
  address text,
  owner text,
  PRIMARY KEY (listing_id) 
);

CREATE TABLE customers (
  customer_id int PRIMARY KEY,
  name text,
  email text,
  avatar_url text )
  WITH comment = 'Q1. Find information about a customer';

CREATE TABLE reviews (
  review_id int,
  posting_date text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (review_id))
  WITH comment = 'Q2. Find a review by id';

CREATE TABLE reviews_by_customer (
  review_id int,
  customer_id int,
  name text,
  posting_date text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (customer_id, name, review_id))
  WITH comment = 'Q3. Find a review by customer';

CREATE TABLE reviews_by_listing (
  review_id int,
  listing_id int,
  address text,
  posting_date text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (listing_id, address, review_id))
  WITH comment = 'Q4. Find a review by listing';



