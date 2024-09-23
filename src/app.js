const { Client, Collection } = require("discord.js");
const fs = require("fs");
const dotenv = require('dotenv');

const client = new Client({
    intents: [32767],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

dotenv.config(); 

fs.readdir(__dirname + "/events/", (err, files) => {
    if (err) return console.error(`[Nucleus] Une erreur est survenue : ${err}`);
    files.forEach(file => {
        const event = require( __dirname + `/events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.registeredCommands = []
client.commands = new Collection()

fs.readdir(__dirname + "/commands/", (err, files) => {
    if (err) return console.error(`[Nucleus] Une erreur est survenue : ${err}`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + `/commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(props.data.name, props)
        client.registeredCommands.push(props.data.toJSON())
        console.log(`[Nucleus] Commande ${commandName} chargée`);
		
    });
});

client.login(process.env.TOKEN);