import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import productoRouter from './routes/productos.js';
import apiUsuariosRouter from './routes/apiUsuarios.js';
import session from 'express-session';
import authRouter from './routes/auth.js';
import apiProductosRouter from "./routes/apiProductos.js";
import apiVentasRouter from "./routes/apiVentas.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'programacion3tp',
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/productos', productoRouter);
app.use('/api/usuarios', apiUsuariosRouter);
app.use("/api/productos", apiProductosRouter);
app.use("/api/ventas", apiVentasRouter);

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



export default app;
