CREATE KEYSPACE reviews WITH replication = 
{'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE reviews.listings (
  listing_id int,
  address text,
  owner text,
  PRIMARY KEY (listing_id) );

CREATE TABLE reviews.customers (
  customer_id int PRIMARY KEY,
  name text,
  email text,
  avatar_url text,
  listing_id int 
WITH comment = 'Q1. Find information about a customer';

CREATE TABLE reviews.reviews (
  review_id int,
  posting_date text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int,
  PRIMARY KEY (review_id),
WITH comment = 'Q2. Find a review by id';

CREATE TABLE reviews.reviews_by_customer (
  review_id int,
  customer_id int,
  posting_date text,
  text text,
  cleanliness int,
  communication int,
  check_in int,
  accuracy int,
  location int,
  value int 
  PRIMARY KEY (customer_id) 
WITH comment = 'Q3. Find a review by customer';
