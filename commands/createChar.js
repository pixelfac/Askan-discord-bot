const { token, prefix } = require('../config.json');

// Character Creation Enum
const createCharSteps = [ "NAME", "SEX", "CLASS", "CLASS_equipment", "CLASS_spells", "RACE", "RACE_ability-scores",
						"ABILITY_SCORES", "HEIGHT","ALIGNMENT", "BACKGROUND", "BACKGROUND_lang",
						"BACKGROUND_equipment", "BACKGROUND_tools", "BACKGROUND_traits","BACKGROUND_ideals",
						"BACKGROUND_bonds", "BACKGROUND_flaws" ]

var currentStep = 0;


//---Formating Info---//
/*
"statmod" arrays are ordered [STR, DEX, CON, INT, WIS, CHA]

charSheet JSON Notes

"class" array is ordered [BARB, BARD, CLERIC, DRUID, FIGHT, MONK, PALA, RNG, ROG, SORC, WARL, WIZ]
"class" array is int array that store each level invested into each class. That info will be converted into String via a function

"skillProf", "weaponProf", and "toolProf" are String arrays that store the names of all skills/weapons/tools that the player if proficient at

"spells" is an array that stores all of the spell objects that a character possesses

*/
//---Formatting Info---//


//---Race Info---//
const templateRace = {
	"name":"",
	"desc":"",
	"statmod":[0,0,0,0,0,0],
	"speed":0,
	"lang":[],
	"skillProf":[],
	"weaponProf":[],
	"traits":[],
	"subrace":[{
				"name":"",
				"statmod":[0,0,0,0,0,0],
				"traits":[]
				}]
}

//import all race require() objects
const dwarf = require("../race_dwarf.json");
const elf = require("../race_elf.json");

//update for each race added above
const raceDesc = `[1] ${dwarf.name}\n[2] ${elf.name}`
//---Race Info---//

//---Class Info---//
const templateClass = {
		"name":"",
		"desc":"",

}
//---Class Info---//


module.exports = {
	name: "createChar",
	description: "Walks you through the process of creating a Dnd character from scratch",
	execute(prefix, message, args) {
		dndmode = true;
		module.exports.config.author = message.author;
		console.log(currentStep)


		//if user uses 'reverse' command, move back one step
		if (message.content.startsWith(`${prefix}reverse`)) {
			currentStep -= 2;
			if (currentStep < 0)
				currentStep = 0
		}

		console.log(currentStep)

		switch (currentStep) {

			case 0:
				message.reply("Please enter your name")
				console.log("dndmode in createChar is " + dndmode)
				module.exports.config.author = message.author;
				currentStep += 1
				break;

			case 1:
				message.reply("Please enter your sex")
				currentStep += 1
				break;

			case 2:
				message.reply("Please enter your class")
				currentStep += 1
				break;

			case 3:
				message.reply("Please enter your class equipment")
				currentStep += 1
				break;

			case 4:
				message.reply("Please enter your class spells")
				currentStep += 1
				break;

			case 5:
				message.reply("Please enter your race")
				currentStep += 1
				break;

			case 6:
				message.reply("Please enter your race ability scores")
				currentStep += 1
				break;

			case 7:
				message.reply("Please enter your ability scores")
				currentStep += 1
				break;

			case 8:
				message.reply("Please enter your height")
				currentStep += 1
				break;

			case 9:
				message.reply("Please enter your alignment")
				currentStep += 1
				break;

			case 10:
				message.reply("Please enter your background")
				currentStep += 1
				break;

			case 11:
				message.reply("Please enter your background languages")
				currentStep += 1
				break;

			case 12:
				message.reply("Please enter your background equipment")
				currentStep += 1
				break;

			case 13:
				message.reply("Please enter your background tools")
				currentStep += 1
				break;

			case 14:
				message.reply("Please enter your background traits")
				currentStep += 1
				break;

			case 15:
				message.reply("Please enter your background ideals")
				currentStep += 1
				break;

			case 16:
				message.reply("Please enter your background bonds")
				currentStep += 1
				break;

			case 17:
				message.reply("Please enter your background flaws")
				currentStep += 1
				break;

			case 18:
				message.reply("You have now finished character creation")
				currentStep = 0
				dndmode = false
				module.exports.config.author = 0
				break;

		}
    },
};

module.exports.config = { "author":0 }