const { Client, Intents } = require("discord.js");
const CommandConfig = require("./Config/Command");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
require("dotenv").config();

const commands = new CommandConfig().showCommands();

client.on("ready", () => {
  console.log(`Pronto senhor! ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf("!") !== 0) return;

  const args = message.content.slice("!".length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const isCommand = commands.entries();

  for (const [_, value] of isCommand) {
    if (value.aliases.includes(command)) return value.run(message, args);
    else continue;
  }

  // if (commands.has(content)) return commands.get(command).run(message, args);

  // message.channel.send('@Nata#0711')
});

module.exports = client;
