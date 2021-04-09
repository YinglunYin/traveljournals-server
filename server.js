const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

app.all(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
               'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// require('./controllers/quizzes-controller')(app)
// require('./controllers/question-controller')(app)
require('./controllers/user-controller')(app)


app.listen(PORT);