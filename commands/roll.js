module.exports = {
	name: "roll",
	description: "simulates rolling dice of various shapes and quantities",
	execute(prefix, message, args) {
		//error catch
		if (!args[0].includes("d")) {
			message.channel.send(`Incorrect notation. Command must contain the letter "d": \`${prefix}roll d12\``);
			return;
		}
		var diceArr = args[0].split('d');
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
	
    },
};
