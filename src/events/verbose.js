const Event = require('../library/Structures/Event');

class Verbose extends Event {

	run(data) {
		this.client.console.verbose(data);
	}

}

module.exports = Verbose;
