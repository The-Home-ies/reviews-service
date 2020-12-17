const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const listingController = require('../db/controllers/listing.js');
const newRelic = require('newrelic');
const queries = require('../queries.js');
const faker = require('faker');

mongoose.set('useCreateIndex', true);
const port = 3003;

const app = express();

mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));
app.use(express.json());

// loader file
app.get('/loaderio-f99fc3126e9877d83f498f8ed9e11443.txt', (req, res) => {
  res.sendFile('../loaderio-f99fc3126e9877d83f498f8ed9e11443.txt', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('sent file');
    }
  });
});

app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

// get all listings
app.get('/api/review-listings/reviews', listingController.getListings);

// get a specific listing
app.get('/api/review-listings/:id/reviews', listingController.getOneListing);

// POST a new review
app.post('/api/listings/:id/reviews', (request, response) => {
  var id = request.params.id;
  var data = request.body;

  var customerIdQuery = `SELECT customer_id FROM customers order by customer_id desc limit 1`;
  var reviewIdQuery = `SELECT review_id FROM reviews order by review_id desc limit 1`;
  queries.pool
    .query(customerIdQuery)
    .then(res => {
      var newCustomerId = Number(res.rows[0].customer_id) + 1;
      var customerInsertQueryText = `INSERT INTO customers(customer_id, name, email, avatar_url, listing_id) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      var customerInsertQueryValues = [newCustomerId, data.name, data.email, data.avatar_url, id];
      queries.pool
        .query(customerInsertQueryText, customerInsertQueryValues)
        .then(res => {
          console.log(res.rows[0]);
          queries.pool
            .query(reviewIdQuery)
            .then(res => {
              var newReviewId = Number(res.rows[0].review_id) + 1;
              var reviewInsertQueryText = `INSERT INTO reviews(review_id, posting_date, text, cleanliness, communication, check_in, accuracy, location, value, author_id, listing_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
              var reviewInsertQueryValues = [newReviewId, data.date, data.text, data.ratings.cleanliness, data.ratings.communication, data.ratings.check_in, data.ratings.accuracy, data.ratings.location, data.ratings.value, newCustomerId, id];
              queries.pool
                .query(reviewInsertQueryText, reviewInsertQueryValues)
                .then(res => {
                  console.log(res.rows[0]);
                  response.send('successfully inserted data into reviews table and customers table');
                })
                .catch(err => {
                  console.log('error inserting data into reviews table');
                  console.log(err);
                })
            })
            .catch(err => {
              console.log('error querying reviews.review_id');
              console.log(err);
            })
        })
        .catch(err => {
          console.log('error inserting data into customers table');
          console.log(err);
        });
    })
    .catch(err => {
      console.log('error querying customer.customer_id');
      console.log(err);
    });
});

// var getCache = {};
// GET all reviews for a listing by listing_id
app.get('/api/listings/:id/reviews', (request, response) => {
  var id = request.params.id;
  // if (Object.keys(getCache).includes(`${id}`)) {
  //   response.send(getCache[`${id}`]);
  // }
  
  var json = {};
  var query = `SELECT * FROM listings, customers, reviews WHERE listings.listing_id = ${id} AND author_id = ${id} AND customer_id = author_id`;
  queries.pool
    .query(query)
    .then(res => {
      var data = res.rows;
      json.listing_id = data[0].listing_id;
      json.address = data[0].address;
      json.reviews = [];
      for (let i = 0; i < data.length; i++) {
        var reviewObj = {
          review: {},
          user: {},
          ratings: {}
        };
        reviewObj.review.review_id = data[i].review_id;
        reviewObj.review.text = data[i].text;
        reviewObj.review.date = data[i].posting_date;
        reviewObj.user.name = data[i].name;
        reviewObj.user.email = data[i].email;
        reviewObj.user.avatar_url = data[i].avatar_url;
        reviewObj.ratings.cleanliness = data[i].cleanliness;
        reviewObj.ratings.communication = data[i].communication;
        reviewObj.ratings.check_in = data[i].check_in;
        reviewObj.ratings.accuracy = data[i].accuracy;
        reviewObj.ratings.location = data[i].location;
        reviewObj.ratings.value = data[i].value;
        json.reviews.push(reviewObj);
      }
    })
    .then(() => {
      // getCache[`${id}`] = json;
      response.send(json);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => (
  console.log(`listening on port ${port}`)
));
