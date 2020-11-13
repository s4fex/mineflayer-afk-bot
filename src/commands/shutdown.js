const Command = require('../library/Structures/Command');

const fs = require('fs');

class Shutdown extends Command {

	constructor(...args) {
		super(...args, {
			name: 'shutdown',
			description: 'Shutdowns the bot.'
		});
	}

	async run(message) {
		this.client.emit('emergency', this.name, message.author);
		fs.writeFile('./.emergency', `emergency:${this.name}:${message.author}`, (err) => {
			if (err) this.client.emit('error', err);
			this.client.bot.end();
			process.exit();
		});
	}

}

module.exports = Shutdown;
