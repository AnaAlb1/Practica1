// Biblioteca de 3ros para manejar errores http
var createError = require('http-errors');

//El framework express minimalista
var express = require('express');

//Biblioteca del nucleo de node que sirve para administrar rutas
var path = require('path');

//Biblioteca externa que sirve para administrar cookies
var cookieParser = require('cookie-parser');

//Biblioteca que registra en consola solicitudes del cliente
var logger = require('morgan');

//Definicion de rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Crando un instancia de express
var app = express();

// view engine setup (configura el motor de plantillas)
//1.Establecer donde estaran las plantillas
//(Vistas --> viws) 
//app.set("<nombre de la var>"), <valor>)
app.set('views', path.join(__dirname, 'views')); //identificar en que SO se ejecuta para poder crear la ruta adecuada

//Establezco que motor precargado usare
app.set('view engine', 'hbs');

//Establezco middleware
app.use(logger('dev'));

//Middleware para parsear a json la peticion 
app.use(express.json());

//Decodifica la URL
app.use(express.urlencoded({ extended: false }));

//Parsear cookies
app.use(cookieParser());

//Servidor de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Registro rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
