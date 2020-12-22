const Discord = require("discord.js");
const { BOT_TOKEN, prefix } = require('./config.json');
const fs = require('fs');


const dnd = require('./Dnd.js');
const math = require('./botMath.js');


const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}


client.once('ready', () => {
   console.log('Ready!');
});

//checks for commands
client.on("message", function(message) { 
   //if the message if from another bot or doesn't start with the prefix, ignore
   if (message.author.bot || !message.content.startsWith(prefix)) return;

   //separates command prefix from command
   const commandBody = message.content.slice(prefix.length);
   //separates command into array separated by ' '
  	const args = commandBody.split(' ');
  	//gets first item in array, args
  	const command = args.shift();

  	switch (command)
  	{

  		//"ping" command
  		case "ping":
  			client.commands.get("ping").execute(prefix, message, args);
    		break;

    	case "sum":
         client.commands.get("sum").execute(prefix, message, args);
         break;

    	case "pow":
         client.commands.get("pow").execute(prefix, message, args);
         break;

      case "roll":
         client.commands.get("roll").execute(prefix, message, args);
         break;

      case "createChar":
         dnd.createChar(message, args[0]);
         break;

      case "printChar":
         dnd.printChar(message, args[0])

      case "jsonincrement":
         dnd.jsonincrement();
         mainCmdActive = false;
         console.log("mainCmdActive is " + mainCmdActive)
         break;

  	}                                 
});                                     

client.login(BOT_TOKEN);