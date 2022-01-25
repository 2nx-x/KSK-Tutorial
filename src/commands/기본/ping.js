const { Command } = require("discord-akairo"),
    { Message } = require("discord.js");

module.exports = class extends Command {
    constructor() {
        super("ping", {
            aliases: [
                "ping",
                "핑"
            ],
            channel: "guild"
            // channel: "dm"
        });
    }

    async exec(message = Message) {
        message.reply(`퐁! ${this.client.ws.ping}ms`)
    }
}