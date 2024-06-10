// src/app.module.ts
import 'reflect-metadata';
import express from 'express';

import { container } from "./inversify.config";
import { InversifyExpressServer } from 'inversify-express-utils';

const main = async () => {


  const app = express(); 
  app.use(express.json());
  let server =  new InversifyExpressServer(container, null, { rootPath: "/api" }, app);
  let appConfigured = server.build();
  appConfigured.listen(3000, () => `App running on 3000`);


}

main().catch(err => {
  console.error(err);
});
// let createError = require('http-errors');

// let path = require('path');
// let cookieParser = require('cookie-parser');
// let logger = require('morgan');

// const jwt = require('jsonwebtoken');



// let indexRouter = require('./routes/index.ts');
// let usersRouter = require('./routes/users.ts');
// let clienteRouter = require('./Api Services/Cliente/ClienteRoutes.ts');
// let categoriaRouter = require('./Api Services/Categoria/CategoriaRoutes.ts');
// let invetarioRouter = require('./Api Services/Invetario/InventarioRoutes.ts');
// let marcaRouter = require('./Api Services/Marca/MarcaRoutes.ts');
// let productoRouter = require('./Api Services/Producto/ProductoRoutes.ts');
// let facturaRouter = require('./Api Services/Factura/FacturaRoutes.ts');
// let authApiRouter = require('./Api Services/Auth/AuthRoutes.ts');
// let vendedorRouter = require('./Api Services/Vendedor/VendedorRoutes.ts');
// let cors = require('cors');
// let app = express();
// app.set('secretKey', 'Meganet162');


// app.use(cors());



// let mongoose = require('mongoose');
// const { assert } = require('console');
// let mongoDB = 'mongodb://localhost/Meganet'
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB Connection error:'));


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.use('/api/auth', authApiRouter);
// app.use('/api/Clientes', validarConsumo, clienteRouter);
// app.use('/api/Categoria',validarConsumo, categoriaRouter);
// app.use('/api/Inventario',validarConsumo, invetarioRouter);
// app.use('/api/Marca',validarConsumo, marcaRouter);
// app.use('/api/Producto',validarConsumo, productoRouter);
// app.use('/api/Factura',validarConsumo, facturaRouter);
// app.use('/api/Vendedor', vendedorRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



// function validarConsumo(req, res, next){


//   jwt.verify(req.headers['tokenkey'], req.app.get('secretKey'), function(err, decoded){
//    if(err){
//        res.json({status: 'error', message: err.message, data: null});
//    }else{
//      req.body.userId = decoded.id;
//      console.log('jwt verificado: '+decoded);
//      next(); 
//    }
//   });

// }




// module.exports = app;
