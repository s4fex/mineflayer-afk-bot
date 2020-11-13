const config = require('../config');
const Client = require('./library/Client');
const Thingy = new Client({ ...config.LOGIN[0], host: config.SERVER.HOST });
Thingy.login();
