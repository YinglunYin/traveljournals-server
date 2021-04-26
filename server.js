const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 52134

app.use(function (req, res, next) {
    const origin = req.headers.origin // In order to use cookie, we must get origin dynamically
    res.header("Access-Control-Allow-Origin", origin);
    // Causing CORS Error
    // res.header("Access-Control-Allow-Origin", origin);
    res.header('Access-Control-Allow-Headers',
               'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
               'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded
({extended: false}))
app.use(bodyParser.json())

const sessionConfig = {
    resave: false,
    saveUninitialized: false,
    secret: "Test",
    cookie : {
        sameSite: 'none',
    }
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));

const mongoose = require('mongoose');
// const databaseName = 'traveljournals'
// const userName = "user123"
// const password = "user123"

mongoose.connect(
    "mongodb+srv://user123:user123@cluster0.ajbuj.mongodb.net/traveljournals?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true});

require('./controllers/user-controller')(app)
require('./controllers/journal-controller')(app)
app.listen(PORT);
