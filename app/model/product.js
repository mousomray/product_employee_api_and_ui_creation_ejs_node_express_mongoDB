const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    p_name: {
        type: String,
        required: true,
        minlength: [3, 'p_name must be at least 3 characters']
    },
    p_size: {
        type: [String], // Array of strings for sizes
        required: true,
        minlength: [5, 'p_size must be at least 3 characters long']
    },
    p_color: {
        type: [String], // Array of strings for colors
        required: true,
        minlength: [5, 'p_color must be at least 3 characters long']
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/05/25/55/06/360_F_525550698_pcSOrKvA81oMHeEgI1e6MJHn1NIzWREd.jpg'
    },
}, { timestamps: true });

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;
