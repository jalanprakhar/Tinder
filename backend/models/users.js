const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    user_id: String,
    hashed_password: String,
    first_name: String,
    dob_day: Number,
    dob_month: Number,
    dob_year: Number,
    show_gender: Boolean,
    gender_identity: String,
    gender_interest: String,
    email: String,
    url: String,
    about: String,
    matches: [{
        user_id: String
    }]

});

module.exports = mongoose.model('User', userSchema);