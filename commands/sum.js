const math = require('../botMath.js');

module.exports = {
	name: "sum",
	description: "adds together the arguments",
	execute(prefix, message, args) {
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
    	var sum = args.map(x => parseFloat(x)).reduce((counter, x) => counter += x);
    	message.channel.send(`The sum of all the arguments you provided is: ${sum}`);	}
};