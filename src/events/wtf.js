const Event = require('../library/Structures/Event');

class WTF extends Event {

	run(data) {
		this.client.console.wtf(data);
	}

}

module.exports = WTF;
