const Event = require('../library/Structures/Event');

class unhandledRejection extends Event {

	constructor(...args) {
		super(...args, { emitter: process });
	}

	run(err) {
		if (!err) return;
		this.client.emit('error', `Uncaught Promise Error: \n${err.stack || err}`);
	}

}

module.exports = unhandledRejection;
