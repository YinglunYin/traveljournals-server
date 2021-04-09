const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.all(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
               'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

const mongoose = require('mongoose');
const databaseName = 'traveljournals'



// let connectionString =
//     'mongodb://localhost/';
//
// connectionString += databaseName;
//
// mongoose.connect(connectionString,
//                  {useNewUrlParser: true ,useUnifiedTopology: true});


const mongoose = require('mongoose');
const databaseName = 'traveljournals'
const userName = "user123"
const password = "user123"

mongoose.connect(`mongodb://${userName}:${password}@traveljournals.ajbuj.mongodb.net:27017/${databaseName}?retryWrites=true&w=majority`,
                 {useNewUrlParser: true ,useUnifiedTopology: true});

require('./controllers/user-controller')(app)
app.listen(PORT);