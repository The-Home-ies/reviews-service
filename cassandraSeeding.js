const fs = require('fs');
const csvWriter = require('csv-write-stream');
const listingsWriter = csvWriter();
const customersWriter = csvWriter();
const reviewsWriter = csvWriter();
const reviewsByCustomerWriter = csvWriter();
const reviewsByListingWriter = csvWriter();
const faker = require('faker');
const debug = require('debug')('app:gen:psql');
const dataArrays = require('./dataArrays.js');

const writeOneMillionTimes = (writer, data, encoding, callback, fileName) => {
    writer.pipe(fs.createWriteStream(`csvData/cassandraCsvData/${fileName}.csv`));
    var i;
    if (fileName === 'listings') {
        i = 1000000;
    } else if (fileName === 'customers') {
        i = 10000000;
    } else if (fileName === 'reviews' || fileName === 'reviewsByCustomer' || fileName === 'reviewsByListing') {
        i = 100000000;
    }
    write();
    function write () {
        let ok = true;
        do {
            i--;
            if (fileName === 'listings') {
                data = {
                    listing_id: i,
                    address: dataArrays.addresses[i % dataArrays.addresses.length],
                    owner: dataArrays.owners[i % dataArrays.owners.length]
                };
            } else if (fileName === 'customers') {
                data = {
                    customer_id: i,
                    name: dataArrays.customers[i % dataArrays.customers.length],
                    email: dataArrays.emails[i % dataArrays.emails.length],
                    avatar_url: 'http://placeimg.com/640/480'
                };
            } else if (fileName === 'reviews') {
                data = {
                    review_id: i,
                    posting_date: dataArrays.dates[i % dataArrays.dates.length],
                    text: dataArrays.texts[i % dataArrays.texts.length],
                    cleanliness: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })],
                    communication: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })],
                    check_in: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })],
                    accuracy: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })],
                    location: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })],
                    value: dataArrays.ratings[faker.random.number({
                        'min': 0,
                        'max': dataArrays.ratings.length - 1
                    })]
                };
            } else if (fileName === 'reviewsByCustomer') {
                data = {
                    review_id: i,
                    customer_id: i,
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    posting_date: faker.date.past(1),
                    text: faker.lorem.sentences(),
                    cleanliness: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    communication: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    check_in: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    accuracy: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    location: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    value: faker.random.number({
                        'min': 1,
                        'max': 5
                    })
                };
            } else if (fileName === 'reviewsByListing') {
                data = {
                    review_id: i,
                    listing_id: i,
                    addres: `${faker.address.streetAddress()} St. ${faker.address.city()}, ${faker.address.state()}, ${faker.address.zipCode()}`,
                    posting_date: faker.date.past(1),
                    text: faker.lorem.sentences(),
                    cleanliness: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    communication: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    check_in: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    accuracy: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    location: faker.random.number({
                        'min': 1,
                        'max': 5
                    }),
                    value: faker.random.number({
                        'min': 1,
                        'max': 5
                    })
                };
            }
            if (i === 0) {
                // last time
                writer.write(data, encoding, callback);
            } else {
                // see if we should continue, or wait
                // don't pass the callback because we're not done yet
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            // had to stop early
            // write some more once it drains
            writer.once('drain', write);
        }
    }
}

async function dataGenerator() {
    debug('start');
    // await writeOneMillionTimes(listingsWriter, {}, 'utf8', (err) => {
    //     if (err) {
    //         console.log(err.message);
    //     } else {
    //         console.log('successfully wrote listings');
    //         listingsWriter.end();
    //     }
    // }, 'listings');
    // await writeOneMillionTimes(customersWriter, {}, 'utf8', (err) => {
    //     if (err) {
    //         console.log(err.message);
    //     } else {
    //         console.log('successfully wrote customers');
    //         customersWriter.end();
    //     }
    // }, 'customers');
    await writeOneMillionTimes(reviewsWriter, {}, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('successfully wrote reviews');
            reviewsWriter.end();
        }
    }, 'reviews');
    await writeOneMillionTimes(reviewsByCustomerWriter, {}, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('successfully wrote reviewsByCustomer');
            reviewsByCustomerWriter.end();
        }
    }, 'reviewsByCustomer');
    await writeOneMillionTimes(reviewsByListingWriter, {}, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('successfully wrote reviewsByListing');
            reviewsByListingWriter.end();
        }
    }, 'reviewsByListing');
}

dataGenerator();

/*
in cassandra shell:
SOURCE '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/cassandra.cql'
*/

/*
COPY reviews.listings(listing_id, address, owner)
  FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/cassandraCsvData/listings.csv'
  WITH DELIMITER = ','
  AND HEADER = true;

COPY reviews.customers(customer_id, name, email, avatar_url)
  FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/cassandraCsvData/customers.csv'
  WITH DELIMITER = ','
  AND HEADER = true;

COPY reviews.reviews(review_id, posting_date, text, cleanliness, communication, check_in, accuracy, location, value)
  FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/cassandraCsvData/reviews.csv'
  WITH DELIMITER = ','
  AND HEADER = true;

COPY reviews.reviews_by_customer(review_id, customer_id, name, posting_date, text, cleanliness, communication, check_in, accuracy, location, value)
  FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/cassandraCsvData/reviewsByCustomer.csv'
  WITH DELIMITER = ','
  AND HEADER = true;

COPY reviews.reviews_by_listing(review_id, listing_id, address, posting_date, text, cleanliness, communication, check_in, accuracy, location, value)
  FROM '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/csvData/cassandraCsvData/reviewsByListing.csv'
  WITH DELIMITER = ','
  AND HEADER = true;
*/