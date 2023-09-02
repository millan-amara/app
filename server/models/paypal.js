const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaypalSchema = new Schema({
    country: String,
    paypalEmail: String,
    currency: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('Paypal', PaypalSchema);