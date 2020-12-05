const fs = require('fs');
const csvWriter = require('csv-write-stream');
const listingsWriter = csvWriter();
const customersWriter = csvWriter();
const reviewsWriter = csvWriter();
const faker = require('faker');
const debug = require('debug')('app:gen:psql');

const generateListings = () => {
    listingsWriter.pipe(fs.createWriteStream('csvData/postgresCsvData/listings.csv'));
    for (let i = 1; i <= 10; i++) {
        listingsWriter.write({
            listing_id: i,
            addres: `${faker.address.streetAddress()} St. ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
            owner: `${faker.name.firstName()} ${faker.name.lastName()}`
        });
    }
    listingsWriter.end();
    console.log('generated listings');    
}

const generateCustomers = () => {
    customersWriter.pipe(fs.createWriteStream('csvData/postgresCsvData/customers.csv'));
    for (let i = 1; i <= 10; i++) {
        customersWriter.write({
            customer_id: i,
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            avatar_url: faker.image.imageUrl(),
            listing_id: Math.floor(Math.random() * (10 - 1) + 1)
        });
    }
    customersWriter.end();
    console.log('generated customers');
}

const generateReviews = () => {
    reviewsWriter.pipe(fs.createWriteStream('csvData/postgresCsvData/reviews.csv'));
    var range = {
        'min': 1,
        'max': 5
    };
    for (let i = 1; i <= 10; i++) {
        reviewsWriter.write({
            review_id: i,
            posting_date: faker.date.past(1),
            text: faker.lorem.sentences(),
            cleanliness: faker.random.number(range),
            communication: faker.random.number(range),
            check_in: faker.random.number(range),
            accuracy: faker.random.number(range),
            location: faker.random.number(range),
            value: faker.random.number(range),
            author_id: i,
            listing_id: i
        });
    }
    reviewsWriter.end();
    console.log('generated reviews');
}

async function dataGenerator() {
    debug('start');
    await generateListings();
    await generateCustomers();
    await generateReviews();
}

dataGenerator();