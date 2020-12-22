let prefix = "~";

class botMath
{

	static sum(message, args){
		if (args.length < 1) {
    		message.channel.send(`Unable to sum blank space. Try adding some terms for my to sum like this: \`${prefix}sum 1 2 3\``);
            return;
        }
        //error catch for if any arg isn't a number
    	for (var num in args){
    		if (typeof parseFloat(num) != 'number') {
    			message.channel.send("Oops! One of those parameters isn't a valid number. This function only knows integers and decimals (and floats).");
                return;
            }
    	}
    	//var sum = args.map(x => parseFloat(x)).reduce((counter, x) => counter += x);
    	message.channel.send(`The sum of all the arguments you provided is: ${args.map(x => parseFloat(x)).reduce((counter, x) => counter += x)}`);
	}
	

	static factorial(message, base){
        
	}


	static pow(message, args){
		if (args.length < 2)
          message.channel.send(`isufficient parameters. There must be only 2 terms after command: \`${prefix}pow 2 3\``);
        if (typeof parseInt(args[0]) != "number" || typeof parseInt(args[1]) != "number") 
          message.channel.send(`Non-numeral parameters detected. Terms after command must be integers or decimals: \`${prefix}pow 2 3\``);
    	message.channel.send(args[0] + "^" + args[1] + " = " + Math.pow(args[0],args[1]));
	}
}

module.exports = botMath