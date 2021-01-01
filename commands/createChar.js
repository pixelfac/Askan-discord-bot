module.exports = {
	name: "createChar",
	description: "Walks you through the process of creating a Dnd character from scratch",
	execute(prefix, message, content, args) {
		dndmode = true;
		module.exports.config.author = message.author;
		//instance variable
		var reply = "";

		//if user uses 'reverse' command, move back one step
		if (message.content.startsWith(`${prefix}reverse`)) {
			currentStep -= 2;
			if (currentStep < 0)
				currentStep = 0;
			isReverse = true;
		}

		//if user uses 'exit' command, reset current step to reset the createChar process
		if (message.content.startsWith(`${prefix}exit`)) {
			currentStep = 0;
			charSheet = JSON.parse(JSON.stringify(templateCharSheet));
			return;
		}

		switch (currentStep) {

			case 0:
				//instantiate blank charSheet
				charSheet = JSON.parse(JSON.stringify(templateCharSheet));
				message.reply(`Welcome to the DnD Character Creator! If at any point you would like to go back a step, type '${prefix}reverse'. To exit the creator, type '${prefix}exit'. Note: character information will not be saved if you exit before the creation is finished. Now let's begin! Please enter your characters name as you would like it to be written in your character sheet, including any titles and suffixes.\nE.G. \`Lord Bartholomew the Brave\``)
				//locks conversation to only take responses from the original cmd author
				module.exports.config.author = message.author;
				currentStep += 1
				break;

			case 1: //processes name
				if (!isReverse) {
					//add in functionality to randomize the character name based off of the race given the '-random' tag in the name var

					//removes nonfilename chars from name
					let name = content.replace(/[<>:"/\\|?*]/g, "_");
					charSheet.name = name
					message.channel.send(`Your character's name is \`${name}\`.`)
				}
				message.reply("Please enter your sex: Type '1' for Male, '2' for Female\n```[1] Male\n[2]Female```")
				currentStep += 1
				break;

			case 2: //processes sex
				if (!isReverse) {
					if (content == 1) charSheet.sex = 1;
					else if (content == 2) charSheet.sex = 0;
					else {
						message.channel.send(`Your input was not valid. I was expecting '1' or '2' and I received '${content}'. Please try again.`);
						return;
					}

					message.channel.send(`Your character's sex is \`${(charSheet.sex == 1) ? 'Male' : 'Female'}\`.`)
				}

				//create and print a string of the class options
				reply = `Please enter your class\n\`\`\``;
				let index = 1;
				for (let cls in classes) {
					reply += `[${index}] ${classes[cls].name}\n`
					index++;
				}
				reply += `\`\`\``;
				message.reply(reply)
				currentStep += 1
				break;



			case 3: //processes class
				if (!isReverse) {

					//iterate through all currently implemented classes and if content matches the class name, assign those class values to the charSheet
					let classIndex = 1;
					for (let cls in classes) {
						if (content == classIndex) {
							chosenClass = classes[cls];
							//set target class to lvl 1
							charSheet.class[classIndexFromName(cls)] = 1;
							charSheet.hitDice = classes[cls].hitDice;
							charSheet.hp = classes[cls].hp;
							charSheet.hpMax = classes[cls].hp;
							charSheet.hpPerLevel = classes[cls].hpPerLevel;
							//set saving throw proficiency
							for (let i = 0; i < classes[cls].savingThrows.length; i++) {
								if (charSheet.savingThrows[i] || classes[cls].savingThrows[i])
									charSheet.savingThrows[i] = 1;
								else charSheet.savingThrows[i] = 0;
							}
							//set other proficiencies
							charSheet.armorProf.push(...classes[cls].armorProf);
							charSheet.toolProf.push(...classes[cls].toolProf)
							charSheet.weaponProf.push(...classes[cls].weaponProf)
							break;
						}
						classIndex++;


					}

					//out of bounds response catch
					if (charSheet.hp === 0) {
						message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${classIndex-1} and I received '${content}'. Please try again.`);
						return;
					}

					message.channel.send(`Your starting class is \`${chosenClass.name}\`.`)

				}
				



				reply = `Pick 2 skills from the following list. Input for choices with a space in between, i.e. \`1 3\` to pick the first and third skills\n\`\`\``
				//prints formatted list of all skills for each class

				let skillIndex = 1;
				for (skill of chosenClass.skillProf) {
					reply += `[${skillIndex}] ${skill}\n`;
					skillIndex++;
				}
				reply += `\`\`\``


				message.reply(reply);		
				currentStep += 1
				break;

			case 4: //processes class skills
				if (!isReverse) {

					//if too many args
					if (args.length > 2) {
						message.channel.send("You have provided too many arguments. I am looking for only 2 numbers. E.G. `1 3`")
						return;
					}

					//select skills from input and add to charSheet
					let skillIndex = 1;
					for (skill of chosenClass.skillProf) {
						if (skillIndex == args[0] || skillIndex == args[1])
							charSheet.skillProf.push(chosenClass.skillProf[skillIndex-1])
						skillIndex++;
					}

					//if user input didn't match expected range
					if (charSheet.skillProf.length < 2)
						message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${skillIndex-1} and I received '${args[0]} and ${args[1]}'. Please try again.`);
					
					message.channel.send(`The skills \`${charSheet.skillProf[0]}\` and \`${charSheet.skillProf[1]}\` have been added to your list of proficiencies.`)
				}


				message.reply("Please enter your class equipment")
				currentStep += 1
				break;

			case 5: //processes class equipment
				if (!isReverse) {
					
				}


				//if chosenClass can cast spells, proceed as usual, otherwise skip this step
				if (chosenClass.spellcasting) {
					reply = `Please enter your class spells`
					//fill in class spells
					message.reply(reply)

				}
				else currentStep += 1
				currentStep += 1
				break;

			case 6: //processes spells
				if (!isReverse) {
					
				}

				message.reply("Please enter your race")
				currentStep += 1
				break;

			case 7:
				if (!isReverse) {
					
				}

				message.reply("Please enter your race ability scores")
				currentStep += 1
				break;

			case 8:
				if (!isReverse) {
					
				}

				message.reply("Please enter your ability scores")
				currentStep += 1
				break;

			case 9:
				if (!isReverse) {
					
				}

				message.reply("Please enter your height")
				currentStep += 1
				break;

			case 10:
				if (!isReverse) {
					
				}

				message.reply("Please enter your alignment")
				currentStep += 1
				break;

			case 11:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background")
				currentStep += 1
				break;

			case 12:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background languages")
				currentStep += 1
				break;

			case 13:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background equipment")
				currentStep += 1
				break;

			case 14:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background tools")
				currentStep += 1
				break;

			case 15:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background traits")
				currentStep += 1
				break;

			case 16:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background ideals")
				currentStep += 1
				break;

			case 17:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background bonds")
				currentStep += 1
				break;

			case 18:	
					if (!isReverse) {
					
				}

				message.reply("Please enter your background flaws")
				currentStep += 1
				break;

			case 19:
				if (!isReverse) {
					
				}

				message.reply("You have now finished character creation")
				currentStep = 0
				dndmode = false
				module.exports.config.author = 0

				//add CON mod to charSheet.hp and charSheet.hpMax and charSheet.hpPerLevel

				//resets charSheet JSON
				//only execute after charSheet has been saved to a file
				charSheet = JSON.parse(JSON.stringify(templateCharSheet));
				break;

		}
		//reset the '~reverse' toggle
		isReverse = false;
    },
};

module.exports.config = { "author":0 }


//toogle var to avoid processing '~reverse' as an answer when that command is used
var isReverse = false;


const { token, prefix } = require('../config.json');

// Character Creation Enum
const createCharSteps = [ "NAME", "SEX", "CLASS", "CLASS_skills", "CLASS_equipment", "CLASS_spells", "RACE", "RACE_ability-scores",
						"ABILITY_SCORES", "HEIGHT","ALIGNMENT", "BACKGROUND", "BACKGROUND_lang",
						"BACKGROUND_equipment", "BACKGROUND_tools", "BACKGROUND_traits","BACKGROUND_ideals",
						"BACKGROUND_bonds", "BACKGROUND_flaws" ]

var currentStep = 0;


//---Formating Info---//
/*

arrays thay reference the ability scores like "statmod" arrays are ordered [STR, DEX, CON, INT, WIS, CHA]

charSheet JSON Notes

"class" array is ordered [BARB, BARD, CLERIC, DRUID, FIGHT, MONK, PALA, RNG, ROG, SORC, WARL, WIZ]
"class" array is int array that store each level invested into each class. That info will be converted into String via a function

"skillProf", "weaponProf", and "toolProf" are String arrays that store the names of all skills/weapons/tools that the player if proficient at

"spells" is an array that stores all of the spell objects that a character possesses

"sex" parameter is 0 = female, 1 = male

*/
//---Formatting Info---//

//Character Sheet JSON
var charSheet = { }

//template character sheet JSON used to reset the charSheet after a character is created
//is instantiated at first step
var templateCharSheet = {
			"name":"",
			"sex":0,
			"race":{},
			"subrace":{},
			"level":1,
			"class":[0,0,0,0,0,0,0,0,0,0,0,0],
			"armorProf":[],
			"toolProf":[],
			"weaponProf":[],
			"skillProf":[],
			"savingThrows":[0,0,0,0,0,0],
			"spellcasting":false,
			"spells":[],
			"lang":[],
			"speed":0,
			"alignment":"",
			"hp":0,
			"hpMax":0,
			"hpPerLevel":0,
			"hitDice":"",
			"ac":0,
			"xp":0,
			"inventory":[],
			"height":0,
			"weight":0,
			"traits":"",
			"ideals":"",
			"bonds":"",
			"flaws":"",


		}


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

var chosenClass = { }

const templateClass = {
		"name":"",
		"desc":"",
		"hitDice":"",
		//add step to add CON mod to hp value
		"hp":0,
		"hpPerPevel":0,
		//add armor prof detection system to include 'all' keyword
		//i'm condsidering a shield as an armor instead of a weapon here
		"armorProf":[],
		"weaponProf":[],
		"toolProf":[],
		"savingThrows":[0,0,0,0,0,0],
		"skillProf":[]

}

const classes = { 
	"fighter": {
		"name":"Fighter",
		"desc":"A master of martial combat, skilled with a variety of weapons and armor",
		"hitDice":"1d10",
		//add step to add CON mod to hp value
		"hp":10,
		"hpPerLevel":6,
		//add armor prof detection system to include 'all' keyword
		//i'm condsidering a shield as an armor instead of a weapon here
		"armorProf":["all","shield"],
		"weaponProf":["simple_all","martial_all"],
		"toolProf":[],
		"savingThrows":[1,0,1,0,0,0],
		//list of all the skills that the class can have proficiency in
		"skillProf":["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"],

	}
	
}
//---Class Info---//


//---Helper Functions---//

function classIndexFromName(name) {
	switch (name) {

//"class" array is ordered [BARB, BARD, CLERIC, DRUID, FIGHT, MONK, PALA, RNG, ROG, SORC, WARL, WIZ]

		case "barbarian":
			return 0;
		case "bard":
			return 1;
		case "cleric":
			return 2;
		case "druid":
			return 3;
		case "fighter":
			return 4;
		case "monk":
			return 5;
		case "paladin":
			return 6;
		case "ranger":
			return 7;
		case "rogue":
			return 8;
		case "sorcerer":
			return 9;
		case "warlock":
			return 10;
		case "wizard":
			return 11;

		//error message for if 'name' is not contained within this function
		default:
			console.log("classIndexFromName name not found error")
			return -1;
	}
}

//---Helper Functions---//
