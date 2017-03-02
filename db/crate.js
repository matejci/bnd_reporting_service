'use strict';

const crate = require('node-crate');

// to use multiple nodes in round robin crate.connect ('http://host1:4200 http://host2:4200')
// to use https crate.connect ('https://host1:4200 https://host2:4200')
crate.connect('localhost', 4200);

module.exports = crate;
