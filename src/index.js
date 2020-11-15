const Client = require('./library/Client');
const { MINECRAFT: { host, port, logins } } = require('../config');

for (const user of logins) {
	new Client({ ...user, host, port }).login();
}

