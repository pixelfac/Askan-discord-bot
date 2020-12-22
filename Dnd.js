const fs = require('fs');

let prefix = "~";


class Dnd
{

	static roll(message, dice) {
		//error catch
		if (!dice.includes("d")) {
			message.channel.send(`Incorrect notation. Command must contain the letter "d": \`${prefix}roll d12\``);
			return;
		}
		var diceArr = dice.split('d');
		console.log(diceArr);
		//error catch
		if (diceArr.length > 2) {
			message.channel.send(`Too many dice! Please only use one multiplier and one die face indicator: \`${prefix}roll d12\``);
			return;
		}
		// d## format
		if (diceArr[0] === '' && typeof parseInt(diceArr[1]) == 'number')
			message.channel.send(`You rolled a ${Math.ceil(Math.random()*parseInt(diceArr[1]))}`);
		// ##d## format
		else if (typeof parseInt(diceArr[0]) == 'number' && typeof parseInt(diceArr[1]) == 'number') {
			var count = 0;
			for (var i=0;i<diceArr[0];i++)
				count += Math.ceil(Math.random()*parseInt(diceArr[1]));
			message.channel.send(`You rolled a ${count}`);
		}
		//error catch
		else message.channel.send(`Non-integer parameters detected on American soil. Terms after command must be integers or decimals: \`${prefix}roll d12\``);
	}



	static createChar(message, name)
	{

		//add in functionality to randomize the character name based off of the race given the '-random' tag in the name var

		//removes nonfilename chars from name
		name = name.replace(/[<>:"/\\|?*]/g, "_");

		//checks if file by that name already exists
		var charPath = `./Dndchars/${name}.json`;
		try {
  			if (fs.existsSync(charPath)) {
				message.channel.send(`A character by that name already exists.\nIf you would like to overwrite the existing character with this name, use: \`${prefix}delChar <name>\` to delete that file, then do \`${prefix}createChar <name>\` again.`);
  				return;
  			}
		} catch(err) {
  			console.error(err);
		}


		var charSheet = {
			"name":name,
			"race":{},
			"subrace":{},
			"level":1,
			"class":[0,0,0,0,0,0,0,0,0,0,0,0],
			"skillProf":[],
			"toolProf":[],
			"weaponProf":[],
			"spells":[],
			"lang":[],
			"speed":0,
			"alignment":"",
			"hp":0,
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
		
		
		message.channel.send(`What race would you like your character to be?\n\`\`\`${raceDesc}\`\`\``);

		message.channel.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 30000}).then(collected => {
            // only accept messages by the user who sent the command
            // accept only 1 message, and return the promise after 30000ms = 30s

            // first (and, in this case, only) message of the collection
            if (collected.first().content.toLowerCase() == '1') {
            	charSheet.race = dwarf;
                message.channel.send('we made it');
                console.log("we got to formatSubraceJSON in collected");
                console.log(JSON.stringify(charSheet));
                console.log("we got after formatSubraceJSON in collected");
               	subraceQ(message);
               	console.log("we got to subraceQ in collected");

            }
			else message.channel.send('Operation canceled.');      
            })//.catch(() => { message.channel.send('No answer after 30 seconds, operation canceled.'); });



	
		/*

		message.channel.send(`What class would you like your character to be?`);


		message.channel.send(`What background would you like your character to have?`);


		message.channel.send(`What alignment would you like your character to have?`);


		message.channel.send(`What equipment would you like your character to have?`);
		*/



		fs.writeFile(charPath,JSON.stringify(charSheet), function (err, file) {
  			if (err) throw err;
		});
		console.log("Created!");

		/* Testing purposes
		fs.readFile(charPath, "utf8", function (err, data) {
  			if (err) throw err;
  			console.log(data);
  		})
  		*/
	}


	static subraceQ(message) {
		console.log("we got to subraceQ")
		message.channel.send(`What subrace would you like your character to be?\n\`\`\`${printzSubraceJSON(dwarf)}\`\`\``);

		message.channel.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 30000}).then(collected => {
            // only accept messages by the user who sent the command
            // accept only 1 message, and return the promise after 30000ms = 30s

            // first (and, in this case, only) message of the collection
            if (collected.first().content.toLowerCase() == '1') {
                message.channel.send('hill dwarf');
                charSheet.subrace = charSheet.race[0];
            }
			else message.channel.send('Operation canceled.');      
            }).catch(() => { message.channel.send('No answer after 30 seconds, operation canceled. beep boop'); });
	}


	static printRaceJSON(json) {
		//to do
		//should call formatSubraceJSON as subraces should
		//be included in the description of races
	}

	static printClassJSON(json) {
		//to do
	}

	static printSubraceJSON(json) {
		//to do
		return "[1] Hill Dwarf\n[2] Mountain Dwarf";

	}

}












// Character Creation Enum
const createCharSteps = [ "SEX", "CLASS", "CLASS_equipment", "CLASS_spells", "RACE", "RACE_ability-scores", "ABILITY_SCORES", "HEIGHT",
								"ALIGNMENT", "BACKGROUND", "BACKGROUND_lang", "BACKGROUND_equipment", "BACKGROUND_tools", "BACKGROUND_traits",
								"BACKGROUND_ideals", "BACKGROUND_bonds", "BACKGROUND_flaw" ]


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
const dwarf = require("./race_dwarf.json");

const elf = require("./race_elf.json");

//update for each race added above
const raceDesc = `[1] ${dwarf.name}\n[2] ${elf.name}`
//---Race Info---//

//---Class Info---//
const templateClass = {
		"name":"",
		"desc":"",

}
//---Class Info---//

module.exports = Dnd
