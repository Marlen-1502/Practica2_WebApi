const express = require('express');
const asyncHandler = require('express-async-handler');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/Product.js');

mongoose.connect('mongodb://localhost:27017/api-asincrona', { 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) => {
	if (err) throw err;
});
console.log('conexion exitosa');


app.set('port', process.env.PORT || 3003);
app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), () =>{
	console.log(`Server on port ${app.get('port')}`);
});

//metodo GET encargado en consultar todos los registros de la base de datos
app.get('/webapi/async',asyncHandler(async (req,res,next) => {
	const f = await Product.find({}, (err) => {
		if(err) throw (err); 
	});
	res.json(f);
}));

//metodo GET encargado de consultar los registros por el atributo "Lado"
app.get('/webapi/async/:Lado',asyncHandler(async (req,res,next) => {
	var Lado = req.params.Lado;
	const l = await Product.find({Lado}, (err) => {
		if(err) throw (err);
	});
	res.json(l);
}));

//metodo POST encargado de insertar nuevos registros a la base de datos
app.post('/webapi/async',asyncHandler(async (req,res,next) => {
	console.log('Post /webapi/product');
	console.log(req.body);

	let inter = new Product();

	inter.Lado = await req.body.Lado;

	await inter.save((err, inter1) =>{
		if(err) throw err;

		res.send({inter: inter1});
	});
}));