const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:postgres@localhost:5432/listing_reviews';

var query = 'SELECT * FROM listings WHERE listing_id = 10;';

// pool, callback
const pool = new Pool({
    connectionString,
});

// pool.query(query, (err, res) => {
//     if (err) {
//         console.log(err.stack);
//     } else {
//         console.log(res.rows);
//     }
//     pool.end();
// });

// client, promise
const client = new Client({
    connectionString,
});

// client.connect();

// client
//     .query(query)
//     .then(res => {
//         console.log(res.rows);
//     })
//     .catch(err => {
//         console.log(err.stack);
//     });

module.exports.pool = pool;
module.exports.client = client;