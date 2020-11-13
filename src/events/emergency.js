const Event = require('../library/Structures/Event');

class Emergency extends Event {

	run(event, username) {
		return this.client.sms.send(`Emergency Triggered: ${event} by ${username}`);
	}

}

module.exports = Emergency;
