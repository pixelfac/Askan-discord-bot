module.exports = {
	name: "db",
	description: "database of Dnd terms and info",
	execute(prefix, message, args) {
	
		switch (args[0]) {

			case "mm":
				console.log('printing allMartialMeleeWeapons')

				reply += `List of all Martial Melee Weapons\nFormat: \`<name>\` : \`<code>\`\n\`\`\``;
				buildWeaponReply(allMartialMeleeWeapons)
				reply += "\`\`\`"
				message.channel.send(reply);
				break;

			case "mr":
				console.log('printing allMartialRangedWeapons')

				reply += `List of all Martial Ranged Weapons\nFormat: \`<name>\` : \`<code>\`\n\`\`\``;
				buildWeaponReply(allMartialRangedWeapons)
				reply += "\`\`\`"
				message.channel.send(reply);
				break;

			case "sm":
				console.log('printing allSimpleMeleeWeapons')

				reply += `List of all Simple Melee Weapons\nFormat: \`<name>\` : \`<code>\`\n\`\`\``;
				buildWeaponReply(allSimpleMeleeWeapons)
				reply += "\`\`\`"
				message.channel.send(reply);
				break;

			case "sr":
				console.log('printing allSimpleRangedWeapons')

				reply += `List of all Simple Ranged Weapons\nFormat: \`<name>\` : \`<code>\`\n\`\`\``;
				buildWeaponReply(allSimpleRangedWeapons)
				reply += "\`\`\`"
				message.channel.send(reply);
				break;

			default:
				message.channel.send("This command takes a category and returns the codes of all the items in that category. These codes are used for inputting selections into this bot, like in the 'createChar' command.")
				break;

		}

    },
};

// File-Scope Variables
var reply = ``;


//import JSONs of all lists of weapons
const allMartialMeleeWeapons = require('../Dnd_equipment/martialMeleeWeapons_WithCodes.json')
const allMartialRangedWeapons = require('../Dnd_equipment/martialRangedWeapons_WithCodes.json');
const allSimpleMeleeWeapons = require('../Dnd_equipment/simpleMeleeWeapons_WithCodes.json');
const allSimpleRangedWeapons = require('../Dnd_equipment/simpleRangedWeapons_WithCodes.json'); 

//builds string of all weapons and codes formatted
function buildWeaponReply(object) {
	//if 'object' param does not have correct properties
	try {
		for (let weap in object) {
			reply += `${weap} : ${object[weap]}\n`
		}
	} catch (err) {
		console.log("object does not have correct properties\n", err)
	}
}