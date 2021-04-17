// require('./db')();
// let usersDao = require('../daos/user-dao');
// let journalsDao = require('../daos/journals-dao');
// // userDao.createUser({
// //     username: "test2",
// //     password:"123456",
// //     email:"wwww@qq.com",
// //     type:"user",
// //     likes:[]
// //                    })
//
// // usersDao.findAllUsers()
// //     .then(users =>
// //               console.log(users));
//
//
// journalsDao.createJournal({
//                               title: "eeee",
//                               author: "test1",
//                               img:"ewrewrwerewrewr",
//
//                               text: "erwefasdfasdfaefa",
//                               placeId: "34234234234",
//                               liker: [],
//                               like_num: 0
//                           }).then(j => console.log(j))


const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://user123:user123@cluster0.ajbuj.mongodb.net/traveljournals?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
