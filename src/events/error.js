const Event = require('../library/Structures/Event');

class Error extends Event {

	run(data) {
		this.client.console.error(data);
	}

}

module.exports = Error;
