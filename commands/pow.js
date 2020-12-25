module.exports = {
    name: "pow",
    description: "raises the first argument to the power of the second argument",
    execute(prefix, message, args) {
    	if (args.length < 2) {
          	message.channel.send(`insufficient parameters. There must be only 2 terms after command: \`${prefix}pow 2 3\``);
          	return;
    	}
    	console.log(args)
        if (isFinite(args[0]) && isFinite(args[1])) {
        	message.channel.send(args[0] + "^" + args[1] + " = " + Math.pow(args[0],args[1]));
        	return;
		}
        message.channel.send(`Non-numeral parameters detected. Terms after command must be integers or decimals: \`${prefix}pow 2 3\``);
    },
};