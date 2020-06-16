const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');


const Product = require('./models/Product.js');

mongoose.connect('mongodb://localhost:27017/api-async-naranja', { 'useNewUrlParser': true, 'useUnifiedTopology': true }, (err) => {
	if (err) throw err;
});
console.log('conexion exitosa');


app.set('port', process.env.PORT || 3003);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(app.get('port'), () =>{
	console.log(`Server on port ${app.get('port')}`);
});

//Recupera los registros de todos los datos que estan guardados en base de datos
app.get('/interrupt/asincrono',asyncHandler(async (req,res,next) => {
	Product.find({}, (err, interruptor) => {
		if(err) throw (err); 

		res.json({ interruptor });
	});
}));

//Recupera los registros usando como parametro el Id
app.get('/interrupt/asincrono/:Posicion_Id',asyncHandler(async (req,res,next) => {
	var Posicion_Id = req.params.Posicion_Id;
	Product.findById(Posicion_Id, (err, interruptor) => {
		if(err) throw (err);
		
		res.json({ interruptor });
	});
}));

//Agrega nuevos registros a base de datos
app.post('/interrupt/asincrono',asyncHandler(async (req,res,next) => {
	console.log('Post /interrupt/asincrono');
	console.log(req.body);

	let interruptor = new Product();

	interruptor.Posicion = await req.body.Posicion;

	await interruptor.save((err, interrup) =>{
		if(err) throw err;

		res.send({interruptor: interrup});
	});
}));