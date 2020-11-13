const Command = require('../library/Structures/Command');

class Ping extends Command {

	constructor(...args) {
		super(...args, {
			name: 'ping',
			description: 'Unloads a piece'
		});
	}

	async run(message, args) {
		if (args.includes('--echo')) return this.client.chat('Pong!');
		return this.client.chat(`/tell ${message.author} Pong!`);
	}

}

module.exports = Ping;
