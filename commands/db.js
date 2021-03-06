const fs = require('fs');

module.exports = {
	name: "db",
	description: "database reference of Dnd terms and info",
	execute(prefix, message, args) {
	
		for (let list in listsOfItems) {
			console.log(listsOfItems[list].header)
			if (args[0] === listsOfItems[list].header) {
				reply == buildList(listsOfItems[list])
				message.channel.send(reply)
				return;
			}
		}

		if (args[0] == 'help' || args[0] == undefined) {
			message.channel.send("This command takes a category and returns the codes of all the items in that category. These codes are used for inputting selections into this bot, like in the 'createChar' command.")
			return;
		}


		message.channel.send(`I don't know what database entry has the name: \`${args[0]}\`.`)
    },
};

// File-Scope Variables
var reply = ``;


//import JSONs of all lists of weapons
var listsOfItems = { }

var codeFiles = fs.readdirSync('./Dnd_equipment').filter(file => file.endsWith('_WithCodes.json'));

for (let filename of codeFiles) {
   let codeJSON = require(`../Dnd_equipment/${filename}`);
   listsOfItems[filename] = codeJSON;
}

//builds string of all items and codes formatted
function buildList(object) {
	reply = "```"
	//if 'object' param does not have correct properties
	try {
		for (let prop in object) {
			if (prop == 'header')
				continue;
			if (prop == 'ListName')
				reply += `List of ${object[prop]}\n\n`
			else reply += `${prop} : ${object[prop]}\n`
		}
	} catch (err) {
		console.log("object does not have correct properties\n", err)
	}

	reply += "```"
	return reply
}