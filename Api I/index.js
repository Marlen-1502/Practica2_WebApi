"use strict"

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Product = require('./models/Product.js')

const app = express()
const port = process.env.PORT || 3004

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('json spaces', 2)


app.get('/api/product',(req,res) =>{
    const k = Product.find({}, (err, interrupt) => {
      if(err) throw (err);

      res.json({ interrupt });
      });
 });
 

app.post('/api/product', (req, res)  =>{
console.log('Post /api/product')
console.log(req.body)

 let product = new Product()
 
 product.palanca_down = req.body.palanca_down

 product.palanca_up = req.body.palanca_up

 product.palanca_centro = req.body.palanca_centro


 product.save((err, productStored) =>{
   if (err) res.status(500).send({message: `error al salvar la base de datos: ${err}` })

 res.status(200).send({product: productStored})
 })
   
})

mongoose.connect('mongodb://localhost:27017/switch', { 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) =>{
  
if(err){
    return console.log(`error al conectar a la base de datos: ${err}`)
}
  console.log('conexion a la base de datos...')

    app.listen(port,() => {
    console.log(`API REST corriendo en http://localhost:${port}`)
    })

})