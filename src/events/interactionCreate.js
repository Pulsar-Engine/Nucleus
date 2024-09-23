const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {	
    let message = "[Nucleus] " + interaction.member.user.username + " à utilisé la commande " + interaction.commandName;
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    if (command.permissions) {
        const authorPermissions = interaction.memberPermissions;
        if (!authorPermissions || !(authorPermissions.has(command.permissions.permission) || command.permissions.users.includes(interaction.autho.id) || interaction.author.roles.cache.some(role => command.permissions.roles.includes(role.id)))) {
            message += " ❌"
            console.log(message);
            interaction.reply({embeds: [new MessageEmbed().setColor('RED').setDescription(`Vous n'avez pas la permission d'utiliser cette commande`)]})
            setTimeout(async () => await interaction.deleteReply(), 10000)
            return;
        }
    }
    message += " ✔️";
    console.log(message);
    await command.execute(client, interaction);
}