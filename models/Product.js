const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
	Posicion: String,
	Date: {type: Date, default: Date()}
});

module.exports = mongoose.model('int_async', ProductSchema);