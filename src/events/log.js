const Event = require('../library/Structures/Event');

class Log extends Event {

	run(data) {
		this.client.console.log(`[${this.client.bot.username}] ${data}`);
	}

}

module.exports = Log;
