const Client = require('./library/Client');
const config = require('../config');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const init = async () => {
	if (Array.isArray(config)) {
		for (const user of config) {
			console.log(`Trying: ${user.username} - Auth: ${user.auth}`);
			new Client({ ...user }).login();
			await sleep(5000);
		}
	} else {
		new Client({ ...config }).login();
	}
};

init();
