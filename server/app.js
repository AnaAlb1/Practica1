import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debug from './service/debugLogger'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.config'

// Recuperar el modo de ejecución de la app
const nodeEnv = process.env.NODE_ENV || 'development'

// Definición de rutas
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import WebpackHotMiddleware from 'webpack-hot-middleware';

// Creando una instancia de express
const app = express();

// Inclusion del webpack middleware
if (nodeEnv === 'development') {
  debug('✒ Ejecutando en modo de desarrollo 👨‍💻')
  // Configurando webpack en modo de desarrollo
  webpackConfig.mode = 'development'
  webpackConfig.entry = [
    "webpack-hot-middleware/client?reload=true&timeout=1000",
    webpackConfig.entry
  ]
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  const bundler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(bundler, {
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(WebpackHotMiddleware(bundler))
} else {
  debug('✒ Ejecutando en modo de producción 🏭')
}


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');


app.use((logger('dev')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));


app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);


app.use((req, res, next)=> {
  next(createError(404));
});


app.use((err, req, res, next)=> {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

export default app;