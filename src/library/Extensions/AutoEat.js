const lodash = require('lodash');
const minecraft = require('minecraft-data');

const Constants = require('../Util/Constants');
const Util = require('../Util/Util');

class AutoEat {

	constructor(bot, options) {
		this.bot = bot;
		this.options = Util.mergeDefault(Constants.AUTOEAT_DEFAULTS, options);

		this.eating = false;
		this.disabled = false;

		this.bot.on('health', () => {
			// if this extension is disabled, do nothing;
			if (this.disabled) return;
			// if we are already eating, continue to eat;
			if (this.eating) return;

			// if we are not hungry, don't eat.
			if (this.bot.food > this.options.startAt) return;

			// if we are using a pathfinder, we need to check to see if we are not moving.
			if (bot.pathfinder) {
				if (!(bot.pathfinder.isMining() || bot.pathfinder.isBuilding())) {
					this.eat();
				}
				return;
			}
			this.eat();
		});
	}

	enable() {
		this.disabled = false;
	}

	disable() {
		this.disabled = true;
	}

	eat() {
		this.eating = true;
		const foods = minecraft(this.bot.version).foodsArray.map((item) => item.name);
		// Check to see if items in inventory are food items and are not banned.
		const foodsInInventory = this.bot.inventory.items().filter((item) => foods.includes(item.name) && !this.options.bannedFood.includes(item.name));
		if (!foodsInInventory || !foodsInInventory.length) {
			this.bot.emit('error', `[AutoEat] I do not have any food to eat!`);
			this.eating = false;
			return true;
		}

		// Determine the best food if any;
		this.bot.emit('log', foodsInInventory);

		const bestFood = this.options.priority === 'saturation' ?
			foodsInInventory.find((item) => item.saturation === lodash.maxBy(foodsInInventory, 'saturation')) :
			foodsInInventory.find((item) => item.foodPoints === lodash.maxBy(foodsInInventory, 'foodPoints'));

		this.bot.emit('autoeat-start');
		this.bot.equip(bestFood, 'hand', (error) => {
			if (error) {
				this.eating = false;
				this.bot.emit('autoeat-stop');
				return this.bot.emit('error', error);
			} else {
				this.bot.consume((err) => {
					this.bot.emit('autoeat-stop');
					this.eating = false;
					if (err) return this.bot.emit('error', err);
					else if (this.bot.food !== 20) return this.eat();
				});
			}
		});
	}

}

module.exports = AutoEat;
