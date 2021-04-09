const usersDao = require('../models/user.dao.server');

module.exports = (app) => {
    const session = require('express-session')
    app.use(session({
                        resave: false,
                        saveUninitialized: true,
                        secret: 'any string'
                    }));

    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded
    ({extended: false}))
    app.use(bodyParser.json())

    register = (req, res) => {
        const newUser = req.body;
        usersDao.createUser(newUser)
            .then(actualUser => {
                req.session['currentUser']
                    = actualUser
                res.json(actualUser)
            })
    }

    require('../data/db')();


    login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        usersDao.findUserByUsernamePassword(username, password)
            .then(user => {
                if (user) {
                    req.session['currentUser'] = user
                    res.send(user)
                } else {
                    res.sendStatus(403)
                }
            })

    }

    currentUser = (req, res) => {
        console.log(req.session)
        return res.json(req.session["currentUser"])
    }


    logout = (req, res) => {
        req.session.destroy()
        res.send(200)
    }

    // app.post('/api/login', login)
    // app.post('/api/register', register)
    // app.post('/api/currentUser',
    //          currentUser)
    // app.post('/api/logout', logout)
    //
    // function setSession(req, res) {
    //     var name = req.params['name'];
    //     var value = req.params['value'];
    //     req.session[name] = value;
    //     res.send(req.session);
    // }
    //
    // function getSession(req, res) {
    //     var name = req.params['name'];
    //     var value = req.session[name];
    //     res.send(value);
    // }
    //
    // function getSessionAll(req, res) {
    //     res.send(req.session);
    // }
    // function resetSession(req, res) {
    //     req.session.destroy();
    //     res.send(200);
    // }
    //
    //
    //
    // app.get('/api/session/set/:name/:value',
    //         setSession);
    // app.get('/api/session/get/:name',
    //         getSession);
    // app.get('/api/session/get',
    //         getSessionAll);
    // app.get('/api/session/reset',
    //         resetSession);
}