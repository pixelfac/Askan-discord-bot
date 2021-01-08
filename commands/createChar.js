module.exports = {
	name: "createChar",
	description: "Walks you through the process of creating a Dnd character from scratch",
	execute(prefix, message, content, args) {
		module.exports.config.author = message.author;
		//instance variable
		var reply = "";

		//if user uses 'reverse' command, move back one step
		if (message.content.startsWith(`${prefix}reverse`) || message.content.startsWith(`${prefix}r`) || message.content.startsWith(`${prefix}REVERSE`)) {
			currentStep -= 2;
			if (currentStep < 0)
				currentStep = 0;
			isReverse = true;
		}

		//if user uses 'exit' command, reset current step to reset the createChar process
		if (message.content.startsWith(`${prefix}exit`) || message.content.startsWith(`${prefix}x`) || message.content.startsWith(`${prefix}EXIT`)) {
			currentStep = 0;
			charSheet = JSON.parse(JSON.stringify(templateCharSheet));
			dndmode = false;
			return;
		}

		//dndmode switch
		dndmode = true;


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
				index = 1;
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
					index = 1;
					for (let cls in classes) {
						if (content == index) {
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
							break;
						}
						index++;


					}

					//out of bounds response catch
					if (charSheet.hp === 0) {
						message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${index-1} and I received '${content}'. Please try again.`);
						return;
					}

					message.channel.send(`Your starting class is \`${chosenClass.name}\`.`)

				}
				



				reply = `Pick 2 skills from the following list. Input for choices with a space in between, i.e. \`1 3\` to pick the first and third skills\n\`\`\``
				//prints formatted list of all skills for each class

				index = 1;
				for (skill of chosenClass.skillProf) {
					reply += `[${index}] ${skill}\n`;
					index++;
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

					if (args[0] == args[1]) {
						message.channel.send("The arguments you have provided are the same. I am looking for 2 different numbers. E.G. `1 3`")
						return;
					}

					//select skills from input and add to charSheet
					index = 1;
					for (skill of chosenClass.skillProf) {
						if (index == args[0] || index == args[1])
							charSheet.skillProf.push(chosenClass.skillProf[index-1])
						index++;
					}

					//if user input didn't match expected range
					if (charSheet.skillProf.length < 2) {
						message.channel.send(`Your input was not valid. I was expecting 2 integers between 1 and ${index-1} and I received '${args[0]} and ${args[1]}'. Please try again.`);
						return;
					}
					
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
				else {
					//if chosenClass needs to select a 1st level Feature
					if ("choselvl1" in chosenClass.features) {
						//stores correct message in chose1stFeatureReply
						chose1stFeature(chosenClass)
						//prints message to user
						message.reply(chose1stFeatureReply)
					}
					else {
						message.reply("Please enter your race")
						currentStep += 1
					}
					currentStep += 1
				}
				currentStep += 1
				break;

			case 6: //processes spells
				if (!isReverse) {
					
				}

				//if chosenClass needs to select a 1st level Feature
				if ("choselvl1" in chosenClass.features) {
					//stores correct message in chose1stFeatureReply
					chose1stFeature(chosenClass)
					//prints message to user
					message.reply(chose1stFeatureReply)
				}
				else {
					message.reply("Please enter your race")
					currentStep += 1
				}
				currentStep += 1
				break;

			case 7: //processes features
				if (!isReverse) {
						
					index = 1;
					//switch used to detect if user inputed valid option
					let noMatch = true;
					for (let feat in chosenClass.features.choselvl1) {
						if (content == index) {
							//adds chosen feature to list of charSheet Features
							charSheet.features[feat] = chosenClass.features.choselvl1[feat];
							message.channel.send(`\`${feat}\` has been added to your character sheet`)
							noMatch = false;
							break;
						}
						index++;
					}

					//out of bounds response catch
					if (noMatch) {
						message.channel.send(`Your input was not valid. I was expecting an integer between 1 and ${index-1} and I received '${content}'. Please try again.`);
						return;
					}

				}

				message.reply("Please enter your race")
				currentStep += 1
				break;

			case 8:
				if (!isReverse) {
					
				}

				message.reply("Please enter your race ability scores")
				currentStep += 1
				break;

			case 9:
				if (!isReverse) {
					
				}

				message.reply("Please enter your ability scores")
				currentStep += 1
				break;

			case 10:
				if (!isReverse) {
					
				}

				message.reply("Please enter your height")
				currentStep += 1
				break;

			case 11:
				if (!isReverse) {
					
				}

				message.reply("Please enter your alignment")
				currentStep += 1
				break;

			case 12:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background")
				currentStep += 1
				break;

			case 13:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background languages")
				currentStep += 1
				break;

			case 14:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background equipment")
				currentStep += 1
				break;

			case 15:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background tools")
				currentStep += 1
				break;

			case 16:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background traits")
				currentStep += 1
				break;

			case 17:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background ideals")
				currentStep += 1
				break;

			case 18:
				if (!isReverse) {
					
				}

				message.reply("Please enter your background bonds")
				currentStep += 1
				break;

			case 19:	
					if (!isReverse) {
					
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
				fs.writeFile(charPath,JSON.stringify(charSheet), function (err, file) {
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

module.exports.config = { "author":0 }

//---'Class' Variables---//

//toogle var to avoid processing '~reverse' as an answer when that command is used
var isReverse = false;

//tracks the current step of char creation
var currentStep = 0;

//Character Sheet JSON
var charSheet = { }

//stores JSON of currently chosenClass
var chosenClass = { }

//stores reply from chose1stFeature
var chose1stFeatureReply = "";

//general purpose index for generating numbered lists
var index = 1;



//---'Class' Variables---//


const { token, prefix } = require('../config.json');
const fs = require('fs') ;

// Character Creation Enum
const createCharSteps = [ "NAME", "SEX", "CLASS", "CLASS_skills", "CLASS_equipment", "CLASS_spells", "CLASS_feature", "RACE", "RACE_ability-scores",
						"ABILITY_SCORES", "HEIGHT","ALIGNMENT", "BACKGROUND", "BACKGROUND_lang",
						"BACKGROUND_equipment", "BACKGROUND_tools", "BACKGROUND_traits","BACKGROUND_ideals",
						"BACKGROUND_bonds", "BACKGROUND_flaws" ]


//---Formating Info---//
/*

arrays thay reference the ability scores like "statmod" arrays are ordered [STR, DEX, CON, INT, WIS, CHA]

charSheet JSON Notes

"class" array is int JSON that stores each level invested into each class. That info will be converted into String via a function

"skillProf", "weaponProf", and "toolProf" are String arrays that store the names of all skills/weapons/tools that the player if proficient at

"spells" is an array that stores all of the spell objects that a character possesses

"sex" parameter is 0 = female, 1 = male

*/
//---Formatting Info---//



//template character sheet JSON used to reset the charSheet after a character is created
//is instantiated at first step
var templateCharSheet = {
			"name":"",
			"sex":0,
			"race":{},
			"subrace":{},
			"level":1,
			"class": {  "Barbarian":0,
						"Bard":0,
						"Cleric":0,
						"Druid":0,
						"Fighter":0,
						"Monk":0,
						"Paladin":0,
						"Ranger":0,
						"Sorcerer":0,
						"Warlock":0,
						"Wizard":0,
					},
			"features":[],
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
	"features":[],
	"subrace":[{
				"name":"",
				"statmod":[0,0,0,0,0,0],
				"features":[]
				}]
}

//import all race require() objects
const dwarf = require("../Dnd_races/dwarf.json");
const elf = require("../Dnd_races/elf.json");

//update for each race added above
const raceDesc = `[1] ${dwarf.name}\n[2] ${elf.name}`
//---Race Info---//



//---Class Info---//

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
		"skillProf":[],
		//list of all class features, a description of what they do, and what level they come at
		//choosing and archetype at lvl 3 will add features to this JSON
		"features":{
					"<name>":{
						"desc":"",
						"level":0
					}
				},
		"equipment":[],

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
		"features":{
					"choselvl1":{
						"Archery":{
							"desc":"You gain a +2 bonus to attack rolls you make with ranged weapons.",
							"level":1
						},
						"Defense":{
							"desc":"While you are wearing armor, you gain a +1 bonus to AC.",
							"level":1
						},
						"Dueling":{
							"desc":"When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
							"level":1
						},
						"Great Weapon Fighting":{
							"desc":"When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
							"level":1
						},
						"Protection":{
							"desc":"When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
							"level":1
						},
						"Two-Weapon Fighting":{
							"desc":"When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.",
							"level":1
						},
					},
					"Second Wind":{
						"desc":"You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.",
						"level":1
					},
					"Action Surge":{
						"desc":"Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.",
						"level":2
					},
					"Martial Archetype":{
						"desc":"At 3rd level, you choose an archetype that you strive to emulate in your combat styles and techniques. Choose Champion, Battle Master, or Eldritch Knight, all detailed at the end of the class description. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.",
						"level":3
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":4
					},
					"Extra Attack":{
						"desc":"You can attack twice, instead of once, whenever you take the Attack action on your turn.",
						"level":5
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":6
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":8
					},
					"Indomitable":{
						"desc":"You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can’t use this feature again until you finish a long rest.",
						"level":9
					},
					"Extra Attack":{
						"desc":"You can attack thrice, instead of twice, whenever you take the Attack action on your turn.",
						"level":11
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":12
					},
					"Indomitable":{
						"desc":"You can use the Indomitable feature twice between long rests.",
						"level":13
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":14
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":16
					},
					"Indomitable 3":{
						"desc":"You can use the Indomitable feature thrice between long rests.",
						"level":17
					},
					"Action Surge 2":{
						"desc":"You can use the Action Surge feature twice before a rest, but only once on the same turn.",
						"level":17
					},
					"Ability Score Improvement":{
						"desc":"You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature. Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
						"level":19
					},
					"Extra Attack":{
						"desc":"You can attack 4 times, instead of 3, whenever you take the Attack action on your turn.",
						"level":20
					},
				},
		"equipment":[],
		},


	}


const classSpellList = require('../Dnd_classes/classSpellList.json');
//---Class Info---//


//---Helper Functions---//

//writes to chose1stFeatureReply the options that a class has as their first feature 
function chose1stFeature(chosenClass) {

	switch (chosenClass.name) {

		case "Fighter":
			chose1stFeatureReply = "The Fighter class lets you chose a fighting style at 1st level. Pick one of the following class features:\n```";

			index = 1;
			for (let style in chosenClass.features.choselvl1) {
				chose1stFeatureReply += `[${index}] ${style}: ${chosenClass.features.choselvl1[style].desc}\n\n`
				index++;
			}
			chose1stFeatureReply += "```";
			return true;
			break;

		default:
			chose1stFeatureReply = "ERROR: chosenClass was believed to have 1st level feature otpions but does not";
			break;

	}

}


//---Helper Functions---//
