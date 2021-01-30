module.exports = {
    name: "fac",
    description: "calculates the factorial of the argument",
    execute(prefix, message, args) {
        if (args.length < 1) {
            message.channel.send(`insufficient parameters. There must be 1 term after command: \`${prefix}fac 5\``);
            return;
        }
        console.log(args)
        if (isFinite(args[0]) && args[0] >= 0) {
            let fac = function (num) {
                if (num == 0) return 1;
                let total = 1;
                for (let i = 1; i <= num; i++)
                    total *= i;
                return total;
            }
            message.channel.send(args[0] + "! = " + fac(args[0]));
            return;
        }
        message.channel.send(`Non-numeral parameters detected. Terms after command must be integers or decimals: \`${prefix}fac 5\``);
    },
};
