module.exports = {
    name: "subtract",
    description: "subtracts the first argument from the second argument",
    execute(prefix, message, args) {
        if (args.length < 2) {
            message.channel.send(`insufficient parameters. There must be only 2 terms after command: \`${prefix}subtract 5 3\``);
            return;
        }
        console.log(args)
        if (isFinite(args[0]) && isFinite(args[1])) {
            message.channel.send(args[0] + " - " + args[1] + " = " + (args[0] - args[1]));
            return;
        }
        message.channel.send(`Non-numeral parameters detected. Terms after command must be integers or decimals: \`${prefix}subtract 5 3\``);
    },
};