const fs = require('fs');
const csvWriter = require('csv-write-stream');
const listingsWriter = csvWriter();
const customersWriter = csvWriter();
const reviewsWriter = csvWriter();
const faker = require('faker');
const debug = require('debug')('app:gen:psql');
const dataArrays = require('./dataArrays.js');

const writeOneMillionTimes = (writer, data, encoding, callback, fileName) => {
    writer.pipe(fs.createWriteStream(`csvData/postgresCsvData/${fileName}.csv`));
    var i;
    if (fileName === 'listings') {
        i = 1000000;
    } else if (fileName === 'customers') {
        i = 10000000;
    } else if (fileName === 'reviews') {
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
                    avatar_url: 'http://placeimg.com/640',
                    listing_id: dataArrays.ids[i % dataArrays.ids.length]
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
                    })],
                    author_id: dataArrays.ids[i % dataArrays.ids.length],
                    listing_id: dataArrays.ids[i % dataArrays.ids.length]
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
}

dataGenerator();

/*
in postgres shell:
\i '/Users/rickymarasigan/Desktop/systemDesignCapstone/reviews-service/postgre.sql';
*/