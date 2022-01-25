require("dotenv").config();

const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require("discord-akairo"),
    {
        Intents
    } = require("discord.js");

const Dokdo = require("dokdo");
const { owners } = require("../config");
const { join } = require("path");

module.exports = class CustomClient extends AkairoClient {
    constructor() {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
            ownerID: owners
        });

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, "..", "commands"),
            prefix: "접두사",
            automateCategories: true,
            handleEdits: true,
            commandUtil: true,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => str,
                    modifyRetry: (_, str) => str,
                    timeout: "Timeout!",
                    ended: "Ended!",
                    cancel: "Canceled.",
                    retries: 3,
                    cancelWord: "cancel"
                },
                otherwise: ""
            },
            ignorePermissions: owners
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners"),
            automateCategories: true
        });

        this.dokdo = Dokdo;
    }

    async _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
        this.dokdo = new Dokdo(this, {
            prefix: "접두사"[0],
            aliases: [
                "dokdo"
            ],
            owners: owners,
            secrets: [
                process.env.TOKEN
            ]
        });
    }

    async start() {
        await this._init();
        return this.login(process.env.TOKEN);
    }
}