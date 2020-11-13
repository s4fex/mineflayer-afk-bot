const Event = require('../library/Structures/Event');

class Log extends Event {

	run(data) {
		this.client.console.log(data);
	}

}

module.exports = Log;
