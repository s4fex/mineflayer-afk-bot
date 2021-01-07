const Event = require('../library/Structures/Event');

class Spawn extends Event {

	run() {
		this.client.ready = true;
		this.client.console.log('Bot ready! Going afk...');
		this.client.bot.setControlState('jump', true);
		setTimeout(() => this.client.bot.setControlState('jump', false), 500);
		this.client.chat('/survival');
		this.client.chat('/afk');
	}

}

module.exports = Spawn;
