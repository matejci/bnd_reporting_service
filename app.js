'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const service = require('./routes/service');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/service')(app);

module.exports = app;
