'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ProductSchema = Schema({
    palanca_down: Number,
    palanca_up: Number,
    fecha: {date: Date},
    date: {type: Date, default: Date()}
})

module.exports = mongoose.model('product', ProductSchema) 
