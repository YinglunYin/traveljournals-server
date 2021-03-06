const usersServices = require("../services/user-service")
const userDao = require("../daos/user-dao")
const journalsDao = require("../daos/journals-dao")
const utils = require("../utils/utils")

module.exports = (app) => {
    const session = require('express-session')
    app.use(session({
                        resave: false,
                        saveUninitialized: true,
                        secret: 'any string'
                    }));

    let register = async (req, res) => {
        let username = req.body.username
        let password = req.body.password
        let email = req.body.email
        let type = req.body.type

        let re = await usersServices.createUser(
            {username: username, password: password, email: email, type: type})

        if(re === 3){
            // already exist
            return utils.responseClient(res, 400, 3, "Already Exist", {})
        }else{
            let data = {};
            data.username = re.username;
            data.type = re.type;
            data.userId = re._id;
            req.session['currentUser'] = data;
            utils.responseClient(res, 200, 2, "Register Succeed", data)
        }

    }

    let login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        usersServices.findUserByUsernamePassword(username, password)
            .then(user => {
                if (user) {
                    let data = {};
                    data.username = user.username;
                    data.type = user.type;
                    data.userId = user._id;
                    req.session['currentUser'] = data;
                    utils.responseClient(res, 200, 0, "Login Succeed", data)
                    return;
                } else {
                    utils.responseClient(res, 400, 1, "Username or Password is wrong!")
                }
            })
    }

    let currentUser = (req, res) => {
        if (req.session["currentUser"]) {
            utils.responseClient(res, 200, 0, "Has Login", req.session["currentUser"])
            // res.status(200)
            // return res.json(req.session["currentUser"])
        } else {
            utils.responseClient(res, 200, 1, "Not Login", {})
            // res.status(403).json({})
        }
    }

    let logout = (req, res) => {
        req.session.destroy()
        res.status(200).json({})
    }

    let findProfile = (req, res) => {
        const username = req.body.username
        usersServices.findProfile(username)
            .then((user) => {
                let data = {};
                data.username = user.username;
                data.type = user.type;
                data.email = user.email;
                data.likes = [];
                data.journals = [];
                data.userId = user._id;
                utils.responseClient(res, 200, 4, "Profile Exist", data)
            })
    }

    let updateProfile = (req, res) => {
        const id = req.body.id
        const user = req.body.user
        usersServices.updateProfile(user, id)
            .then((user) => {
                if (user) {
                    let data = {};
                    data.username = user.username;
                    data.type = user.type;
                    data.userId = user._id;
                    utils.responseClient(res, 200, 6, "Edit Successfully", data)
                    return;
                } else {
                    utils.responseClient(res, 400, 5, "Edit Failed")
                }
            })
    }

    let deleteUser = async (req, res) => {
        const userId = req.body.userId;
        let code = await usersServices.deleteUser(userId);
        if (code === 8) {
            utils.responseClient(res, 200, 8, "Deleted Successfully", {})
        } else {
            utils.responseClient(res, 400, 7, "Deleted Failed")
        }
    }

    let hello = (req, res) => {
        res.send("Hello World")
    }

    let findUserJournals = (req, res) => {
        const username = req.body.username
        usersServices.findUserByName(username)
            .then((re) => {
                usersServices.findJournalByUser(re._id)
                    .then((re1) => {
                        if (re1) {
                            utils.responseClient(res, 200, 18, 'succeed', re1.journals)
                        } else {
                            utils.responseClient(res, 400, 17, "failed", {})
                        }
                    })
            })
    }

    let findUserLikes = (req, res) => {
        const username = req.body.username
        usersServices.findUserByName(username)
            .then((re) => {
                usersServices.findUserLikes(re._id)
                    .then((re1) => {
                        if (re1) {
                            utils.responseClient(res, 200, 18, 'succeed', re1.likes)
                        } else {
                            utils.responseClient(res, 400, 17, "failed", {})
                        }
                    })
            })
    }

    let findAllUsers = (req, res) => {
        usersServices.findAllUsers()
            .then((re) => {
                if (re) {
                    utils.responseClient(res, 200, 30, "succeed", re)
                }
            })
    }


    app.post('/api/users/login', login)
    app.post('/api/users/register', register)
    app.post('/api/users/currentUser',
             currentUser)
    app.post('/api/users/profile', findProfile)
    app.post('/api/users/logout', logout)
    app.post('/api/users/profile/edit', updateProfile)
    app.post('/api/users/journals', findUserJournals)
    app.post('/api/users/likes', findUserLikes)
    app.post('/api/users/', findAllUsers)
    app.post('/api/users/delete', deleteUser)

    app.get('/', hello)

}