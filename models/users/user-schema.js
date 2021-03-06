const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
                                       username: String,
                                       password: String,
                                       email: String,
                                       type: {type:String, enum:["USER", "ADMIN"]},
                                       likes:[{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'journalModel'
                                       }],
                                       journals:[{
                                           type: mongoose.Schema.Types.ObjectId,
                                           ref: 'journalModel'
                                       }]
                                   }, {collection: 'users'});
module.exports = userSchema;