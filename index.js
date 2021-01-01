const Discord = require("discord.js");
const { token, prefix } = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();

global.dndmode = false;


//compile all commands into a collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}


//ready message
client.once('ready', () => {
   console.log('Ready!');
});

//checks for commands
client.on("message", function(message) { 
   //if the message if from another bot or doesn't start with the prefix, ignore
   if (message.author.bot || (!dndmode && !message.content.startsWith(prefix))) return;

   //separates command prefix from command
   const commandBody = message.content.slice(prefix.length);
   //separates command into array separated by ' '
  	var args = commandBody.split(' ');
  	//gets first item in array, args
  	const command = args.shift();

  	switch (command)
  	{

  		//"ping" command
  		case "ping":
  			client.commands.get("ping").execute(prefix, message, args);
    		break;

    	//see gn.js
    	case "gn":
    		client.commands.get("gn").execute(prefix, message, args)
    		break;

    	//see add.js
    	case "add":
         client.commands.get("add").execute(prefix, message, args);
         break;

      //see subtract.js
    	case "subtract":
         client.commands.get("subtract").execute(prefix, message, args);
         break;

      //see pow.js
    	case "pow":
         client.commands.get("pow").execute(prefix, message, args);
         break;

      //see subtract.js
    	case "fac":
         client.commands.get("fac").execute(prefix, message, args);
         break;

      //see roll.js
      case "roll":
         client.commands.get("roll").execute(prefix, message, args);
         break;

      //see createChar.js
      case "createChar":
         client.commands.get("createChar").execute(prefix, message, args);
         break;

      //moves back on step in createChar
      case "reverse":
      	if (dndmode)
         	client.commands.get("createChar").execute(prefix, message, message.content, args);
         break;

      //prints the chosen dnd charSheet
      case "printChar":
      	message.channel.send("Out of Service");
      	break;

     	//exits out of dndmode (and any other modes if I implement them later)
      case "exit":
      	dndmode = false;
      	client.commands.get("createChar").execute(prefix, message, message.content, args);
      	message.channel.send("You've exited the current mode and can type regularly")
      	break;

      default:
      	//reformats var args to not consider a command keyword
      	args = message.content.split(' ');

      	if (dndmode && client.commands.get("createChar").config.author == message.author) {
      		client.commands.get("createChar").execute(prefix, message, message.content, args);
      	}
      	break;

  	}                                 
});                                     

client.login(token);