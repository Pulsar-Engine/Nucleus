const { REST, Routes } = require('discord.js');

const TOKEN = process.env.TOKEN;
const SERVER_ID = process.env.SERVER_ID;
const CLIENT_ID = process.env.CLIENT_ID;

module.exports = async (client) => {
	const rest = new REST().setToken(TOKEN);
	await rest.put(Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID), { body: client.registeredCommands })
		.then(() => console.log('[Nucleus] Commandes bien enrengistrées'))
		.catch(console.error);
	console.log(`[Nucleus] ${client.user.tag} connecté`);
}