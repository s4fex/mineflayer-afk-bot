const Event = require('../library/Structures/Event');
const { isFunction } = require('../library/Util/Util');

class Spawn extends Event {

	run() {
		this.client.console.log('Bot ready! Going afk...');

		this.client.ready = true;

		// EMPTY THAT BUCKET!
		if (this.client.options.bucket) {
			// If this bucket is a string only, echo out that string to chat.
			if (typeof this.client.options.bucket === 'string') {
				this.client.chat(this.client.options.bucket);
			}
			if (Array.isArray(this.client.options.bucket)) {
				// Guess its an array.
				this.client.options.bucket.forEach((leak) => {
					if (isFunction(leak)) {
						leak(this.client);
					} else if (typeof leak === 'string' && leak.length > 0) {
						this.client.chat(leak);
					}
				});
			}
		}
	}

}

module.exports = Spawn;
