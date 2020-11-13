const Event = require('../library/Structures/Event');

class Warn extends Event {

	run(data) {
		this.client.console.warn(data);
	}

}

module.exports = Warn;
