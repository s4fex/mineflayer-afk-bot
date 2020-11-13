const { mergeDefault } = require('./Util');

const colorBase = {
	shard: { background: 'cyan', text: 'black' },
	message: {},
	time: {}
};

const Constants = {
	CLIENT_DEFAULTS: {
		username: 'Player',
		password: '',
		host: '127.0.0.1',
		port: 25565,
		version: '1.16.4',
		logErrors: true,
		hideErrors: true,
		keepAlive: true,
		checkTimeoutInterval: 30 * 1000,
		loadInternalPlugins: true,
		pieceDefaults: {
			commands: {
				description: ''
			},
			events: {
				enabled: true,
				once: false
			}
		}
	},
	CONSOLE_DEFAULTS: {
		stdout: process.stdout,
		stderr: process.stderr,
		timestamps: true,
		utc: false,
		types: {
			debug: 'log',
			error: 'error',
			log: 'log',
			verbose: 'log',
			warn: 'warn',
			wtf: 'error'
		},
		colors: {
			debug: mergeDefault(colorBase, { time: { background: 'magenta' } }),
			error: mergeDefault(colorBase, { time: { background: 'red' } }),
			log: mergeDefault(colorBase, { time: { background: 'blue' } }),
			verbose: mergeDefault(colorBase, { time: { text: 'gray' } }),
			warn: mergeDefault(colorBase, { time: { background: 'lightyellow', text: 'black' } }),
			wtf: mergeDefault(colorBase, { message: { text: 'red' }, time: { background: 'red' } })
		}
	},
	AUTOEAT_DEFAULTS: {
		priority: 'foodpoints',
		startAt: 14,
		bannedFood: []
	}
};

module.exports = Constants;
