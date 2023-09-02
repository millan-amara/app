const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    native: [],
    spoken: [],
    translation: [],
    bank: {},
    paypal: {},
    sName: String,
    residence: String,
    dob: String,
    nationality: String,
    gender: String,
    phone: String,
    skype: String,
    wechat: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', UserSchema);