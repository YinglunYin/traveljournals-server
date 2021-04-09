const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
                                       username: String,
                                       password: String,
                                       email: String,
                                       type: {type:String, enum:["USER", "ADMIN"]},
                                       likes: [String]
                                   });
module.exports = userSchema;