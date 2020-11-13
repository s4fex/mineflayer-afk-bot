const { EventEmitter } = require('events');
const Collection = require('@discordjs/collection');
const path = require('path');
const fs = require('fs');

const Mineflayer = require('mineflayer');

// stores
const BotConsole = require('./Util/BotConsole');
const CommandStore = require('./Structures/CommandStore');
const EventStore = require('./Structures/EventStore');

// utilities
const Bandwidth = require('./Extensions/Bandwidth');
const AutoEat = require('./Extensions/AutoEat');

const Util = require('./Util/Util');
const Constants = require('./Util/Constants');

class MinecraftAFKBot extends EventEmitter {

	constructor(options = {}) {
		super();

		this.isEmergency();

		if (!Util.isObject(options)) throw new TypeError('Constructor options must be an object.');
		this.options = Util.mergeDefault(Constants.CLIENT_DEFAULTS, options);

		this.ready = false;

		this.userBaseDirectory = path.dirname(require.main.filename);
		this.console = new BotConsole();

		this.commands = new CommandStore(this);
		this.events = new EventStore(this);

		// this.sms = new Bandwidth(this.options.SMS_PROXY_DOMAIN);

		this.pieceStores = new Collection();

		this.registerStore(this.commands)
			.registerStore(this.events);

		const coreDirectory = path.join(__dirname, '../');
		for (const store of this.pieceStores.values()) store.registerCoreDirectory(coreDirectory);
	}

	chat(message) {
		if (!this.ready) return false;
		return this.bot.chat(message);
	}

	registerStore(store) {
		this.pieceStores.set(store.name, store);
		return this;
	}

	unregisterStore(storeName) {
		this.pieceStores.delete(storeName);
		return this;
	}

	isEmergency() {
		if (fs.existsSync('./.emergency')) {
			console.error('Client is in emergency state! Not loading!');
			return process.exit();
		} else { return false; }
	}

	async login() {
		const loaded = await Promise.all(this.pieceStores.map(async store => `Loaded ${await store.loadAll()} ${store.name}.`))
			.catch((err) => {
				console.error(err);
				process.exit();
			});
		this.emit('log', loaded.join('\n'));
		this.emit('log', `Logging in as ${this.options.username}...`);

		this.bot = Mineflayer.createBot(this.options);
		['message', 'error', 'warn', 'log', 'unhandledRejection', 'login', 'spawn', 'respawn', 'kicked', 'end', 'death'].forEach((events) => {
			this.bot.on(events, (...args) => this.emit(events, ...args));
		});

		this.autoeat = new AutoEat(this.bot);
	}

}

module.exports = MinecraftAFKBot;
