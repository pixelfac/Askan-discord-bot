module.exports = {
    name: "pow",
    description: "raises arg[0] to the power of arg[1]",
    execute(prefix, message, args) {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);
    },
};