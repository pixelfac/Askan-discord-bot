module.exports = {
	name: "createChar",
	description: "Walks you through the process of creating a Dnd character from scratch",
	execute(prefix, message, args) {
		module.exports.config.author = message.author;

		//if user uses 'reverse' command, move back one step
		if (message.content.startsWith(`${prefix}reverse`) || message.content.startsWith(`${prefix}r`) || message.content.startsWith(`${prefix}REVERSE`)) {
			currentStep -= 2;

			//allows user to reverse past the spellcasting step if they are not a spellcasting class
			if (currentStep == 5 && !charSheet.spellcasting)
				currentStep -= 1

			//prevents negative values
			if (currentStep < 0)
				currentStep = 0;

			isReverse = true;
			console.log("Used Reverse command: went back a step.")
			console.log("Current Step is:", createCharSteps[currentStep]);
		}

		//if user uses 'exit' command, reset current step to reset the createChar process
		if (message.content.startsWith(`${prefix}exit`) || message.content.startsWith(`${prefix}x`) || message.content.startsWith(`${prefix}EXIT`)) {
			currentStep = 0;
			charSheet = JSON.parse(JSON.stringify(templateCharSheet));
			dndmode = false;
			console.log('Used Exit commant: exited dndmode')
			return;
		}

		//dndmode switch
		dndmode = true;


		switch (currentStep) {

			case 0:
				askName(message)
				currentStep += 1
				break;

			case 1: //processes name
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processName(message)
					if (reply === null) return;
					message.channel.send(reply)
				}

				askSex(message)
				currentStep += 1
				break;

			case 2: //processes sex
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processSex(message)
					if (reply === null) return;
					message.channel.send(reply)
				}

				askClass(message)
				currentStep += 1
				break;

			case 3: //processes class
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processClass(message)
					if (reply === null) return;
					message.channel.send(reply)
				}


				askClassSkills(message)
				currentStep += 1
				break;

			case 4: //processes class skills
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processClassSkills(message, args)
					if (reply === null) return;
					message.channel.send(reply)
				}


				askClassEqpt(message)
				currentStep += 1
				break;

			case 5: //processes class equipment
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processClassEqpt(message, args)
					if (reply === null) return;
					message.channel.send(reply)
				}


				//if chosenClass can cast spells, proceed as usual, otherwise skip this step
				if (chosenClass.spellcasting) {
					askSpells(message)
				}
				else {
					//if chosenClass needs to select a 1st level Feature
					if ("choselvl1" in chosenClass.features) {
						askClassFeatures(message)
					}
					else {
						askRace(message)
						currentStep += 1
					}
					currentStep += 1
				}
				currentStep += 1
				break;

			case 6: //processes spells
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				//if chosenClass needs to select a 1st level Feature
				if ("choselvl1" in chosenClass.features) {
					askClassFeatures(message)
				}
				else {
					askRace(message)
					currentStep += 1
				}
				currentStep += 1
				break;

			case 7: //processes features
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
					reply = processClassFeatures(message)
					if (reply === null) return;
					message.channel.send(reply)
				}

				askRace(message)
				currentStep += 1
				break;

			case 8:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your race ability scores")
				currentStep += 1
				break;

			case 9:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your ability scores")
				currentStep += 1
				break;

			case 10:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your height")
				currentStep += 1
				break;

			case 11:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your alignment")
				currentStep += 1
				break;

			case 12:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background")
				currentStep += 1
				break;

			case 13:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background languages")
				currentStep += 1
				break;

			case 14:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background equipment")
				currentStep += 1
				break;

			case 15:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background tools")
				currentStep += 1
				break;

			case 16:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background traits")
				currentStep += 1
				break;

			case 17:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background ideals")
				currentStep += 1
				break;

			case 18:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background bonds")
				currentStep += 1
				break;

			case 19:
				if (!isReverse) {
					console.log(createCharSteps[currentStep - 1] + ":", message.content)
				}

				message.reply("Please enter your background flaws")
				currentStep += 1
				break;

			case 20:


				message.reply("You have now finished character creation")
				currentStep = 0
				dndmode = false
				module.exports.config.author = 0

				//add CON mod to charSheet.hp and charSheet.hpMax and charSheet.hpPerLevel


				let charPath = `../Dnd_chars/${charSheet.name}.json`;

				//saves file
				fs.writeFile(charPath, JSON.stringify(charSheet), function (err, file) {
					if (err) throw err;
				});
				console.log("Created!");

				//resets charSheet JSON
				//only execute after charSheet has been saved to a file
				charSheet = JSON.parse(JSON.stringify(templateCharSheet));
				break;

		}
		//reset the '~reverse' toggle
		isReverse = false;
	},
};

module.exports.config = { "author": 0 }

//---'Class' Variables---//

//toogle var to avoid processing '~reverse' as an answer when that command is used
var isReverse = false;

//tracks the current step of char creation
var currentStep = 0;

//Character Sheet JSON
var charSheet = {}

//stores JSON of currently chosenClass
var chosenClass = {}

//general purpose index for generating numbered lists
var index = 1;

//string filled with messages/responses sent to user
var reply = "";


//---'Class' Variables---//


//---Init Stuff---//

const { prefix } = require('../config.json');
const fs = require('fs');

const spells = require('../Dnd_spells/spells.json')

//import weapon json arrays
const martialMeleeWeapons = require('../Dnd_equipment/martialMeleeWeapons.json');
const martialRangedWeapons = require('../Dnd_equipment/martialRangedWeapons.json');
const simpleMeleeWeapons = require('../Dnd_equipment/simpleMeleeWeapons.json');
const simpleRangedWeapons = require('../Dnd_equipment/simpleRangedWeapons.json');

//assigns codes for weapon classes
const martialMeleeWeaponsCodes = require('../Dnd_equipment/martialMeleeWeapons_WithCodes.json')
const martialRangedWeaponsCodes = require('../Dnd_equipment/martialRangedWeapons_WithCodes.json');
const simpleMeleeWeaponsCodes = require('../Dnd_equipment/simpleMeleeWeapons_WithCodes.json');
const simpleRangedWeaponsCodes = require('../Dnd_equipment/simpleRangedWeapons_WithCodes.json');

// Character Creation Enum
const createCharSteps = ["NAME", "SEX", "CLASS", "CLASS_skills", "CLASS_equipment", "CLASS_spells", "CLASS_feature", "RACE",
	"RACE_ability-scores", "ABILITY_SCORES", "HEIGHT", "ALIGNMENT", "BACKGROUND", "BACKGROUND_lang",
	"BACKGROUND_equipment", "BACKGROUND_tools", "BACKGROUND_traits", "BACKGROUND_ideals",
	"BACKGROUND_bonds", "BACKGROUND_flaws"]

//---Init Stuff---//



//---Formating Info---//
/*

arrays thay reference the ability scores like "statmod" arrays are ordered [STR, DEX, CON, INT, WIS, CHA]

charSheet JSON Notes

"class" array is int JSON that stores each level invested into each class. That info will be converted into String via a function

"skillProf", "weaponProf", and "toolProf" are String arrays that store the names of all skills/weapons/tools that the player if proficient at

"spells" is an array that stores all of the spell objects that a character possesses

"sex" parameter is 0 = female, 1 = male


in class json:
equipment JSON has property, 'free', which is String arr of equipment that don't require use input
also has 'opt' properties which store the options the player has to chose between

*/
//---Formatting Info---//

//template character sheet JSON used to reset the charSheet after a character is created
//is instantiated at first step
var templateCharSheet = {
	"name": "",
	"sex": 0,
	"race": {},
	"subrace": {},
	"level": 1,
	"class": {
		"Barbarian": 0,
		"Bard": 0,
		"Cleric": 0,
		"Druid": 0,
		"Fighter": 0,
		"Monk": 0,
		"Paladin": 0,
		"Ranger": 0,
		"Sorcerer": 0,
		"Warlock": 0,
		"Wizard": 0,
	},
	"features": [],
	"armorProf": [],
	"toolProf": [],
	"weaponProf": [],
	"skillProf": [],
	"savingThrows": [0, 0, 0, 0, 0, 0],
	"spellcasting": false,
	"spells": [],
	"lang": [],
	"speed": 0,
	"alignment": "",
	"hp": 0,
	"hpMax": 0,
	"hpPerLevel": 0,
	"hitDice": "",
	"ac": 0,
	"xp": 0,
	"inventory": [],
	"height": 0,
	"weight": 0,
	"traits": "",
	"ideals": "",
	"bonds": "",
	"flaws": "",


}


//---Race Info---//
const templateRace = {
	"name": "",
	"desc": "",
	"statmod": [0, 0, 0, 0, 0, 0],
	"speed": 0,
	"lang": [],
	"skillProf": [],
	"weaponProf": [],
	"features": [],
	"subrace": [{
		"name": "",
		"statmod": [0, 0, 0, 0, 0, 0],
		"features": []
	}]
}

//import all race require() objects
const races = {}
races.dwarf = require("../Dnd_races/dwarf.json");
races.elf = require("../Dnd_races/elf.json");

//---Race Info---//



//---Class Info---//

const templateClass = {
	"name": "",
	"desc": "",
	"hitDice": "",
	//add step to add CON mod to hp value
	"hp": 0,
	"hpPerPevel": 0,
	//add armor prof detection system to include 'all' keyword
	//i'm condsidering a shield as an armor instead of a weapon here
	"armorProf": [],
	"weaponProf": [],
	"toolProf": [],
	"savingThrows": [0, 0, 0, 0, 0, 0],
	"skillProf": [],
	//list of all class features, a description of what they do, and what level they come at
	//choosing and archetype at lvl 3 will add features to this JSON
	"features": {
		"<name>": {
			"desc": "",
			"level": 0
		}
	},
	"equipment": {
		//when nothing is given without player input, 'free' array is empty
		"free": [""],
		"opt1": {
			"a": [""],
			"b": [""]
		}
	},

}

const classes = {}
classes.fighter = require('../Dnd_classes/fighter.json')


const classSpellList = require('../Dnd_classes/classSpellList.json');
//---Class Info---//


//---Helper Functions---//



//used to check if str is int [0,9]
function isNatNum(str) {
	switch (str) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;
			break;
		default:
			return false;

	}
}

//returns true if weapon code is contained within options (mm,sr,mw,etc), false otherwise
function isValidWeaponCode(code, options) {
	//if both melee and ranged weapons are included in options
	if (options === "mw")
		return isValidWeaponCode(code, "mm") || isValidWeaponCode(code, "mr");
	if (options === "sw")
		return isValidWeaponCode(code, "sm") || isValidWeaponCode(code, "sr");

	return (code.startsWith(options) && parseInt(code.substring(2)) >= 0 && parseInt(code.substring(2)) <= Object.keys(chosenClass.equipment).length) ? true : false;
}

//returns int
//used to parse equipment strings
function getQuantityFromStr(str) {
	return parseInt(str.substring(str.lastIndexOf("x") + 1))
}

//pluralizes items if they are a quantity
//EX: Arrow x10 -> 10 Arrows 
function formatItemQuantity(str) {
	//if str isn't in quantity format
	if (isNaN(parseInt(str.substring(str.lastIndexOf("x") + 1))))
		return str;

	let num = getQuantityFromStr(str)
	let item = str.substring(0, str.lastIndexOf("x")).trim();
	return `${num} ${item}s`
}

//takes a weapon code and returns the full name of that weapon
function getWeaponFromCode(code) {
	let weaponJSON;
	switch (code.substr(0, 2)) {

		case "mm":
			weaponJSON = martialMeleeWeaponsCodes;
			break;

		case "mr":
			weaponJSON = martialRangedWeaponsCodes;
			break;

		case "sm":
			weaponJSON = simpleMeleeWeaponsCodes;
			break;

		case "sr":
			weaponJSON = simpleRangedWeaponsCodes;

		default:
			//error no match found
			return null;
	}

	for (let name in weaponJSON) {
		if (weaponJSON[name] === code)
			return name;
	}
	//error no match found in database
	return null;
}

//takes a db code and expands that into the full phrase
function expandDBCode(str) {
	switch (str) {
		case 'mw':
			return 'Any Martial Ranged or Melee Weapon'
		case 'mm':
			return 'Any Martial Melee Weapon'
		case 'mr':
			return 'Any Martial Ranged Weapon'
		case 'sw':
			return 'Any Simple Ranged or Melee Weapon'
		case 'sm':
			return 'Any Simple Melee Weapon'
		case 'sr':
			return 'Any Simple Ranged Weapon'
		case 'at':
			return 'Any Artisans Tools'
		case 'hs':
			return 'Any Holy Symbol'
		case 'in':
			return 'Any Instrument'
		default:
			return str;
	}
}

//builds the alert to use the db command given
//the equipment the player is to chose from
function dbAlertFromEqpt(equipment) {
	//total list of codes found in equipment
	let dbCodes = [];
	let rtrnStr = "";

	for (let opt in equipment) {
		//skip free b/c it will never have a choice
		if (opt === 'free') continue;

		//look through remaining options
		else
			for (let arr in equipment[opt])
				for (let str in equipment[opt][arr]) {
					//if mw or sw, convert to mm + mr, etc.
					switch (equipment[opt][arr][str]) {
						case 'mw':
							if (!dbCodes.includes('mm'))
								dbCodes.push('mm')
							if (!dbCodes.includes('mr'))
								dbCodes.push('mr')
							break;
						case 'sw':
							if (!dbCodes.includes('sm'))
								dbCodes.push('sm')
							if (!dbCodes.includes('sr'))
								dbCodes.push('sr')
							break;
						//if not mw or sw, treat as normal code
						default:
							if (equipment[opt][arr][str].length == 2 && !dbCodes.includes(equipment[opt][arr][str]))
								dbCodes.push(equipment[opt][arr][str])
							break;
					}
				}
	}

	//build rtrn string
	if (dbCodes.length != 0) {
		rtrnStr = `At least one of the following options asks you to pick 'Any' item from a given list. To view that list of selectable items, use the command \`${prefix}db <db_code>\`. You will need to use the following codes:\n\n`;
		for (let code of dbCodes)
			rtrnStr += `Code: \`${code}\` for \`${expandDBCode(code)}\`\n`
	}

	return rtrnStr + "\n"
}

//converts cardinal # -> ordinal #
function cardinalToOrdinal(number) {
	let lastNumberString = number.toString().slice(-1);

	switch (lastNumberString) {
		case "1":
			if (number < 10 || number > 19)
				return number + "st"
		case "2":
			if (number < 10 || number > 19)
				return number + "nd"
		case "3":
			if (number < 10 || number > 19)
				return number + "rd"
		default:
			return number + "th"
			break;
	}
}

//ask for name
//see case 0
function askName(message) {
	//instantiate blank charSheet
	charSheet = JSON.parse(JSON.stringify(templateCharSheet));
	message.reply(`Welcome to the DnD Character Creator! If at any point you would like to go back a step, type '${prefix}reverse'. To exit the creator, type '${prefix}exit'. Note: character information will not be saved if you exit before the creation is finished. Now let's begin! Please enter your characters name as you would like it to be written in your character sheet, including any titles and suffixes.\nE.G. \`Lord Bartholomew the Brave\``)
	//locks conversation to only take responses from the original cmd author
	module.exports.config.author = message.author;
}

//processes name input
//see case 1
function processName(message) {
	//removes nonfilename chars from name
	let name = message.content.replace(/[<>:"/\\|?*]/g, "_");
	charSheet.name = name
	return `Your character's name is \`${name}\`.`;
}

//ask for sex
//see case 1
function askSex(message) {
	message.reply("Please enter your sex: Type '1' for Male, '2' for Female\n```[1] Male\n[2]Female```")
}

//processes sex input
//see case 2
function processSex(message) {
	if (message.content == 1) charSheet.sex = 1;		//Male
	else if (message.content == 2) charSheet.sex = 0;	//Female
	else {
		//error message
		message.channel.send(`Your input was not valid. I was expecting '1' or '2' and I received '${message.content}'. Please try again.`);
		//cue to abort process
		return null;
	}
	return `Your characters sex is \`${(charSheet.sex === 1) ? 'Male' : 'Female'}\`.`
}

//ask for class
//see case 2
function askClass(message) {
	//create and print a string of the class options
	reply = `Please enter your class\n\`\`\``;
	index = 1;
	for (let cls in classes) {
		reply += `[${index}] ${classes[cls].name}\n`
		index++;
	}
	reply += `\`\`\``;
	message.reply(reply)
}

//processes class input
//see case 3
function processClass(message) {

	//error catch; if input is valid natural number 
	if (!isNatNum(message.content)) {
		message.channel.send(`Your input was not valid. I was expecting an integer and I received '${message.content}'. Please try again.`);
		return null;
	}

	//iterate through all currently implemented classes and if content matches the class name, assign those class values to the charSheet
	index = 1;
	for (let cls in classes) {
		if (message.content == index) {
			chosenClass = classes[cls];
			//set target class to lvl 1
			charSheet.class[chosenClass.name] = 1;
			charSheet.hitDice = chosenClass.hitDice;
			charSheet.hp = chosenClass.hp;
			charSheet.hpMax = chosenClass.hp;
			charSheet.hpPerLevel = chosenClass.hpPerLevel;
			//set saving throw proficiency
			for (let i = 0; i < chosenClass.savingThrows.length; i++) {
				if (charSheet.savingThrows[i] || chosenClass.savingThrows[i])
					charSheet.savingThrows[i] = 1;
				else charSheet.savingThrows[i] = 0;
			}
			//set other proficiencies
			charSheet.armorProf.push(...chosenClass.armorProf)
			charSheet.toolProf.push(...chosenClass.toolProf)
			charSheet.weaponProf.push(...chosenClass.weaponProf)

			for (let ftr in chosenClass.features) {
				if (chosenClass.features[ftr].level == 1)
					charSheet.features[ftr] = chosenClass.features[ftr]
			}
		}
		break;
		index++;
	}

	//out of bounds response catch
	if (charSheet.hp === 0) {
		message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${index} and I received '${message.content}'. Please try again.`);
		return null;
	}

	return `Your starting class is \`${chosenClass.name}\`.`;

}

//ask for class skills
//see case 3
function askClassSkills(message) {
	reply = `Pick 2 skills from the following list. Input your choices with a space in between, i.e. \`1 3\` to pick the first and third skills\n\`\`\``
	//prints formatted list of all skills for each class

	index = 1;
	for (skill of chosenClass.skillProf) {
		reply += `[${index}] ${skill}\n`;
		index++;
	}
	reply += `\`\`\``


	message.reply(reply);
}

//processes class input
//see case 4
function processClassSkills(message, args) {
	//if too many args
	if (args.length > 2) {
		message.channel.send("You have provided too many arguments. I am looking for only 2 numbers. E.G. `1 3`")
		return null;
	}

	if (args[0] == args[1]) {
		message.channel.send("The arguments you have provided are the same. I am looking for 2 different numbers. E.G. `1 3`")
		return null;
	}

	if (args.length < 2) {
		message.channel.send("You have provided too few arguments. I am looking for only 2 numbers. E.G. `1 3`")
		return null;
	}

	if (!isNatNum(args[0])) {
		message.channel.send(`Your input was not valid. I was expecting an integer and I received '${message.content}'. Please try again.`);
		return null;
	}

	if (!isNatNum(args[1])) {
		message.channel.send(`Your input was not valid. I was expecting an integer and I received '${message.content}'. Please try again.`);
		return null;
	}

	//select skills from input and add to charSheet
	index = 1;
	for (skill of chosenClass.skillProf) {
		if (index == args[0] || index == args[1])
			charSheet.skillProf.push(chosenClass.skillProf[index - 1])
		index++;
	}

	//if user input didn't match expected range
	if (charSheet.skillProf.length < 2) {
		message.channel.send(`Your input was not valid. I was expecting 2 integers between 1 and ${index - 1} and I received '${args[0]} and ${args[1]}'. Please try again.`);
		return null;
	}

	return `The skills \`${charSheet.skillProf[0]}\` and \`${charSheet.skillProf[1]}\` have been added to your list of proficiencies.`;

}

//ask for class equipment
//see case 4
function askClassEqpt(message) {
	reply = 'Please select your starting equipment.\n';

	reply += dbAlertFromEqpt(chosenClass.equipment)

	for (let opt in chosenClass.equipment) {
		//free if it exists, add those items in this format
		if (opt === 'free') {
			reply += `The following item(s) are given to you for free:\n`
			for (let j = 0; j < chosenClass.equipment.free.length - 1; j++) {
				reply += `\`${chosenClass.equipment.free[j]}\`, `
			}
			reply += `\`${chosenClass.equipment.free[chosenClass.equipment.free.length - 1]}\`\n\n`

		}
		//if opt1, opt2, etc.
		else {
			reply += `Pick equipment from the following options. You cannot mix and match options:\n`
			for (let abc in chosenClass.equipment[opt]) {
				reply += `\`[${abc}] `
				for (let k = 0; k < chosenClass.equipment[opt][abc].length - 1; k++) {
					reply += `${formatItemQuantity(expandDBCode(chosenClass.equipment[opt][abc][k]))}, `
				}
				reply += `${formatItemQuantity(expandDBCode(chosenClass.equipment[opt][abc][chosenClass.equipment[opt][abc].length - 1]))}\`\n`
			}
			reply += `\n`
		}
	}

	message.reply(reply)
}

//processes class equipment input
//see case 5
function processClassEqpt(message, args) {
	//convert to lowercase to make input detection fuzzier
	args = message.content.toLowerCase().split(' ')

	let containsFree = 'free' in chosenClass.equipment;
	let itemsChosen = []

	//add free equipment to charSheet
	if (containsFree)
		itemsChosen.push(...chosenClass.equipment.free);

	//count number of options
	let numOpt = Object.keys(chosenClass.equipment).length + ((containsFree) ? -1 : 0);

	//insufficient parameters error catch
	if (args.length < numOpt) {
		message.channel.send(`Insufficient number of choices selected. I was looking for ${numOpt} choices. Please try again.`)
		return null;
	}


	//iterate through arguments to see if there is a match
	//if so, add to list of itemsChosen
	index = 0;
	for (let opt in chosenClass.equipment) {
		//skip free if it exists
		if (opt === 'free')
			continue;

		//check for 'mw', 'sr', etc
		for (let arr in chosenClass.equipment[opt]) {
			//if options allows selecting weapon using code
			if (chosenClass.equipment[opt][arr][0] === 'mw' || chosenClass.equipment[opt][arr][0] === 'mm' || chosenClass.equipment[opt][arr][0] === 'mr' || chosenClass.equipment[opt][arr][0] === 'sw' || chosenClass.equipment[opt][arr][0] === 'sm' || chosenClass.equipment[opt][arr][0] === 'sr' || chosenClass.equipment[opt][arr][0] === 'hs' || chosenClass.equipment[opt][arr][0] === 'at' || chosenClass.equipment[opt][arr][0] === 'in') {
				//if input is a through e and a..e could not be valid inputs, throw err
				if (args[index] < 'f' && Object.keys(chosenClass.equipment[opt]).length == 1) {
					message.channel.send(`Invalid input. I was looking for a code from the database at your ${cardinalToOrdinal(index + 1)} selection, but I recieved \`${args[index]}\`. Please try again.`)
					return null;
				}

				//if user input is valid code from given weapon lists
				if (isValidWeaponCode(args[index], chosenClass.equipment[opt][arr][0])) {
					//add chosen weapon to chosen items
					itemsChosen.push(getWeaponFromCode(args[index]))
					break;
				}
				//if letter input not allowed, letter matches option that has db code, or letter is out of bounds with expected range => throw error
				else if (Object.keys(chosenClass.equipment[opt]).length == 1 || args[index] == arr || args[index].charCodeAt(0) <= 96 || args[index].charCodeAt(0) > (96 + Object.keys(chosenClass.equipment[opt]).length)) {
					message.channel.send(`Invalid input. I was looking for a code from the database at your ${cardinalToOrdinal(index + 1)} selection, but I recieved \`${args[index]}\`. Please try again.`)
					return null;
				}
			}
		}


		if (args[index] in chosenClass.equipment[opt]) {
			itemsChosen.push(...chosenClass.equipment[opt][args[index]])
		}
		index++;
	}


	charSheet.inventory.push(...itemsChosen)

	let rtrn = "The equipment that you have chosen are as follows: ";
	for (let item of itemsChosen) {
		rtrn += `\`${formatItemQuantity(item)}\`, `
	}
	return rtrn.substr(0, rtrn.length - 2)


}

//ask for spells
//see case 5
function askSpells(message) {
	message.reply('Please enter your class spells')
}

//processes spells
//see case 6
function processSpells(message) {
	//TODO
}

//ask for class features
//see case 6
function askClassFeatures(message) {

	switch (chosenClass.name) {

		case "Fighter":
			reply = "The Fighter class lets you chose a fighting style at 1st level. Pick one of the following class features:\n```";

			index = 1;
			for (let style in chosenClass.features.choselvl1) {
				reply += `[${index}] ${style}: ${chosenClass.features.choselvl1[style].desc}\n\n`
				index++;
			}
			reply += "```";
			break;

		default:
			reply = "ERROR: Chosen Class was believed to have 1st level feature options but does not";
			break;
	}
	message.reply(reply)
}

//processes class features
//see case 7
function processClassFeatures(message) {
	index = 1;
	//switch used to detect if user inputed valid option
	for (let feat in chosenClass.features.choselvl1) {
		if (message.content == index) {
			//adds chosen feature to list of charSheet Features
			charSheet.features[feat] = chosenClass.features.choselvl1[feat];
			return `\`${feat}\` has been added to your character sheet`
		}
		index++;
	}

	//out of bounds response catch
	message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${index - 1} and I received '${message.content}'. Please try again.`);
	return null;
}

//ask for race
//see case 7
function askRace(message) {
	//create and print a string of the race options
	reply = `Please enter your race\n\`\`\``;
	index = 1;
	for (let race in races) {
		reply += `[${index}] ${races[race].name}\n`
		index++;
	}
	reply += `\`\`\``;
	message.reply(reply)
}


//---Helper Functions---//