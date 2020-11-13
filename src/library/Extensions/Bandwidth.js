const Websocket = require('ws');
const fetch = require('node-fetch');

class Bandwidth extends Websocket {

	constructor(apiURL) {
		super(`${apiURL}/bandwidth/incoming`);
		this.apiURL = apiURL;

		this.on('open', () => this.send('Hello!'));
		this.on('message', (msg) => this.client.emit('debug', `[WSS] ${msg}`));
	}

	static send(text = 'Today is a lovely day.', to = '+15555555555') {
		return this.sendMessage(text, to);
	}

	static async sendMessage(text = 'Today is a lovely day.', to = '+15555555555') {
		return await fetch(`${this.apiURL}/bandwidth/outgoing`, { method: 'POST', body: JSON.stringify({ to, text }) })
			.then((res) => {
				if (res.ok) return res.json();
				else return res;
			});
	}

}

module.exports = Bandwidth;
