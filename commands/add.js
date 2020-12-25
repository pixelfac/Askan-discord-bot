module.exports = {
	name: "add",
	description: "adds together the arguments",
	execute(prefix, message, args) {
        //if no args
		if (args.length < 1) {
    		message.channel.send(`Unable to sum blank space. Try adding some terms for my to sum like this: \`${prefix}sum 1 2 3\``);
            return;
        }

        //error catch for if any arg isn't a number
    	for (var num in args){
    		if (!isFinite(num)) {
    			message.channel.send(`Oops! ${num} isn't a valid number. This function only knows integers and decimals (and floats).`);
                return;
            } 
    	}
        //adds all args together
    	var sum = args.map(x => parseFloat(x)).reduce((counter, x) => counter += x);
    	message.channel.send(`The sum of the arguments you provided is: ${sum}`);	}
};