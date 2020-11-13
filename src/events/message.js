const Event = require('../library/Structures/Event');

const fetch = require('node-fetch');
const apiUrl = 'https://api.eternal.gs';

class Message extends Event {

	async run(json, position) {
		const message = json.toString().split(' ');
		if (!message.shift().startsWith('From')) return	this.client.console.log(`(${position}) ${json.toAnsi()}`);

		const username = message.shift();
		if (username !== 'Kashall') {
			const result = await fetch(`${apiUrl}/user/${username}`, {
				headers: { 'User-Agent': 'kashallbot/1.0 (+https://api.jordanjones.org/never+gonna+give+you+up' }
			}).then((res) => {
				if (res.ok) { return res.json(); } else {
					this.client.emit('error', `[API Fetch] Server not-okay.`);
					return null;
				}
			});
			if (!result) return this.client.console.error(`[Message Handler] Unable to handle ${apiUrl}/user/${username}. Server sent not-okay response!`);
			if (result.group_id <= 8) return this.client.console.log(`[Message Handler] ${username} tried to message me but I am a bot so idk what to do. `);
		}

		message.shift();
		console.log(message);

		if (!message.join(' ').startsWith('/')) {
			this.client.console.log(`[Echo] ${username}: ${message.join(' ')}`);
			return this.client.chat(message.join(' '));
		}

		const cmd = message.shift().slice('/'.length).toLowerCase();
		const command = this.client.commands.get(cmd);
		if (!command) return this.client.chat(`/tell ${username} Unknown Command`);
		this.client.console.log(`[Command] ${username}: /${command.name} ${message}`);
		return command.run({ ...json, username, author: username }, message);
	}

}

module.exports = Message;
