var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const jwt = require('jsonwebtoken');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clienteRouter = require('./Api Services/Cliente/ClienteRoutes');
var categoriaRouter = require('./Api Services/Categoria/CategoriaRoutes');
var invetarioRouter = require('./Api Services/Invetario/InventarioRoutes');
var marcaRouter = require('./Api Services/Marca/MarcaRoutes');
var productoRouter = require('./Api Services/Producto/ProductoRoutes');
var facturaRouter = require('./Api Services/Factura/FacturaRoutes');
var authApiRouter = require('./Api Services/Auth/AuthRoutes');
var vendedorRouter = require('./Api Services/Vendedor/VendedorRoutes');
var cors = require('cors');
var app = express();
app.set('secretKey', 'Meganet162');


app.use(cors());



var mongoose = require('mongoose');
const { assert } = require('console');
var mongoDB = 'mongodb://localhost/Meganet'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/auth', authApiRouter);
app.use('/api/Clientes', validarConsumo, clienteRouter);
app.use('/api/Categoria',validarConsumo, categoriaRouter);
app.use('/api/Inventario',validarConsumo, invetarioRouter);
app.use('/api/Marca',validarConsumo, marcaRouter);
app.use('/api/Producto',validarConsumo, productoRouter);
app.use('/api/Factura',validarConsumo, facturaRouter);
app.use('/api/Vendedor', vendedorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



function validarConsumo(req, res, next){


  jwt.verify(req.headers['tokenkey'], req.app.get('secretKey'), function(err, decoded){
   if(err){
       res.json({status: 'error', message: err.message, data: null});
   }else{
     req.body.userId = decoded.id;
     console.log('jwt verificado: '+decoded);
     next(); 
   }
  });

}




module.exports = app;
