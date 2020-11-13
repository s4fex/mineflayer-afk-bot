/* eslint-disable max-len */
const { SERVER, LOGIN, BANDWIDTHAPI: { applicationId, ACCOUNTID, TOKEN, SECRET, to, from } } = require('../config');

const Mineflayer = require('mineflayer');

const BandwidthMessaging = require('@bandwidth/messaging');
const BandwidthController = BandwidthMessaging.APIController;
BandwidthMessaging.Configuration.basicAuthUserName = TOKEN;
BandwidthMessaging.Configuration.basicAuthPassword = SECRET;

// const loggedInUsers = new Set();

function createBot(user) {
	const client = Mineflayer.createBot({
		host: SERVER.HOST,
		port: SERVER.PORT,
		username: user.USERNAME,
		password: user.PASSWORD
	});

	client.user = user;

	client.on('spawn', () => {
		client.chat('/afk');
	});
	client.on('kicked', (reason, loggedIn) => {
		const msg = JSON.parse(reason);
		let message = msg.text;
		if (msg.extra) {
			msg.extra.forEach((obj) => {
				message += obj.text.replace(/[\n\t\r]/g, '');
			});
		}
		console.log(`[${user.USERNAME}] I got kicked from the server. (LoggedIn: ${loggedIn})\nReason: ${message}`);

		if (!loggedIn) return;
		if (!message.includes('Restarting')) sendMessage(`[Kicked] (${client.username}): ${message}`);
	});

	client.on('error', (err) => console.log(err));
	// client.on('end', createBot(client.user));
}

async function sendMessage(text) {
	const content = new BandwidthMessaging.MessageRequest({ applicationId, to, from, text });
	const response = await BandwidthController.createMessage(ACCOUNTID, content);
	console.log(`Response From Sending Message::\n${response}`);
}

for (const user of LOGIN) {
	try {
		createBot(user);
	} catch (err) {
		console.error(`[Error] ${err}`);
	}
}

