const Client = require('./library/Client');
const config = require('../config');

if (Array.isArray(config)) {
	for (const user of config) {
		console.log(`Trying: ${user.username} - Auth: ${user.auth}`);
		new Client({ ...user }).login();
	}
} else {
	new Client({ ...config }).login();
}
