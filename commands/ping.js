module.exports = {
	name: "ping",
	description: "Prints a message reporting the latency of this request",
	execute(prefix, message, args) {
		const timeTaken = Date.now() - message.createdTimestamp;
    	message.channel.send(`Pong! This message had a latency of ${timeTaken}ms.`);
    },
};
