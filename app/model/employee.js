const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email address should follow the format: abc@gmail.com']
    },
    phone: {
        type: Number,
        required: true,
        min: [1000000000, 'Phone number must be exactly 10 digits'],
        max: [9999999999, 'Phone number must be exactly 10 digits']
    },
    city: {
        type: String,
        required: true,
        minlength: [3, 'City must be at least 3 characters long']
    },
    pin: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true,
        minlength: [3, 'Position must be at least 3 characters long']
    },
    image: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg'
    },

}, { timestamps: true }); // timestamps show create date and update date

const EmployeeModel = mongoose.model('employee', EmployeeSchema);

module.exports = EmployeeModel;