'use strict';

const crate = require('node-crate');
const config = require('../config/common');

// to use multiple nodes in round robin crate.connect ('http://host1:4200 http://host2:4200')
// to use https crate.connect ('https://host1:4200 https://host2:4200')

switch(process.env.NODE_ENV) {
	case config.NODE_ENV.LOCAL:
		crate.connect(config.ENV.LOCAL.CRATE_HOST, config.ENV.LOCAL.CRATE_PORT);
		break;
	default:
		crate.connect('localhost', 4200);
}

module.exports = crate;
