require('./db')();
let usersDao = require('../models/user.dao.server');
let journalsDao = require('../models/journal.dao.server');
// userDao.createUser({
//     username: "test2",
//     password:"123456",
//     email:"wwww@qq.com",
//     type:"user",
//     likes:[]
//                    })

// usersDao.findAllUsers()
//     .then(users =>
//               console.log(users));


journalsDao.createJournal({
                              title: "eeee",
                              author: "test1",
                              img:"ewrewrwerewrewr",

                              text: "erwefasdfasdfaefa",
                              placeId: "34234234234",
                              liker: [],
                              like_num: 0
                          }).then(j => console.log(j))