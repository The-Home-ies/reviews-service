const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
var faker = require('faker');

var generateListings = () => {
    writer.pipe(fs.createWriteStream('csvData/listings.csv'));
    
    for (let i = 1; i <= 10; i++) {
        writer.write({
            listing_id: i,
            addres: `${faker.address.streetAddress()} St. ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
            owner: `${faker.name.firstName()} ${faker.name.lastName()}`
        });
    }

    writer.end();
    console.log('generated listings');
}

// generateListings();

const generateCustomers = () => {
    writer.pipe(fs.createWriteStream('csvData/customers.csv'));

    for (let i = 1; i <= 10; i++) {
        writer.write({
            customer_id: i,
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            avatar_url: faker.image.imageUrl(),
            listing_id: Math.floor(Math.random() * (10 - 1) + 1)
        });
    }

    writer.end();
    console.log('generated customers');
}

// generateCustomers();

const generateReviews = () => {
    writer.pipe(fs.createWriteStream('csvData/reviews.csv'));
    var range = {
        'min': 1,
        'max': 5
    };
    for (let i = 1; i <= 10; i++) {
        writer.write({
            review_id: i,
            posting_date: faker.date.past(1),
            text: faker.lorem.sentences(),
            cleanliness: faker.random.number(range),
            communication: faker.random.number(range),
            check_in: faker.random.number(range),
            accuracy: faker.random.number(range),
            location: faker.random.number(range),
            value: faker.random.number(range)
        });
    }

    writer.end();
    console.log('generated reviews');
}

// generateReviews();

/*
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
*/

const generateReviewsByCustomer = () => {
    writer.pipe(fs.createWriteStream('csvData/reviewsByCustomer.csv'));
    var range = {
        'min': 1,
        'max': 5
    };
    for (let i = 1; i <= 10; i++) {
        writer.write({
            review_id: i,
            customer_id: i,
            posting_date: faker.date.past(1),
            text: faker.lorem.sentences(),
            cleanliness: faker.random.number(range),
            communication: faker.random.number(range),
            check_in: faker.random.number(range),
            accuracy: faker.random.number(range),
            location: faker.random.number(range),
            value: faker.random.number(range)
        });
    }

    writer.end();
    console.log('generated reviews by customer');
}

generateReviewsByCustomer();

/*
COPY reviews (review_id, posting_date, text, cleanliness, communication, check_in, accuracy, location, value) FROM '/Users/rickymarasigan/Desktop/SDCseedTesting/test.csv' WITH header = true;
*/