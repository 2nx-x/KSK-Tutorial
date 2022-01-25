const { Listener } = require("discord-akairo");

module.exports = class extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    async exec() {
        if(!this.client.user) return;

        console.log("봇이 준비 되었어요.");
    }
}