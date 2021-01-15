module.exports = {
	name: "db",
	description: "database of Dnd terms and info",
	execute(prefix, message, args) {
		
		message.reply(``);

		switch (args[0]) {

			case "mm":
				console.log('printing allMartialMeleeWeapons')
				break;

		}

    },
};

//import JSONs of all lists of weapons
const allMartialMeleeWeapons = require('../Dnd_equipment/martialMeleeWeapons_WithCodes.json')
const allMartialRangedWeapons = require('../Dnd_equipment/martialRangedWeapons_WithCodes.json');
const allSimpleMeleeWeapons = require('../Dnd_equipment/simpleMeleeWeapons_WithCodes.json');
const allSimpleRangedWeapons = require('../Dnd_equipment/simpleRangedWeapons_WithCodes.json'); 

