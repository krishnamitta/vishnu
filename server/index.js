import express from 'express'
import session from 'express-session'
import logger from './logger'
import setup from './middlewares/frontendMiddleware'
import login from './auth/login'
import bodyParser from 'body-parser'
import { resolve } from 'path'

const argv = require('minimist')(process.argv.slice(2));
const envConfig = { path: resolve(process.cwd(), 'config/environments/server', `${process.env.NODE_ENV}.js`) }
require('dotenv').config(envConfig);
const FileStore = require('session-file-store')(session)

// initialize node express framework
const app = express()
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const port = process.env.PORT || 3000;

app.use(express.static(resolve(process.cwd(), 'public')))

// Node.js body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// session middleware for express
app.use(session({
  name: 'SessionID',
  secret: process.env.AUTH_SECRET,
  saveUninitialized: true,
  resave: true,
  store: new FileStore
}))

setup(app, {
  outputPath: resolve(process.cwd(), 'public', 'js'),
  publicPath: '/',
});

app.post('/login', login.authenticate)

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }
      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }

  logger.info(`App started in ${process.env.NODE_ENV} environment.`)
});
