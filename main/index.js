const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {

    console.log(`Pronto senhor! ${client.user.tag}`)

})


module.exports = client