const { Client, GatewayIntentBits } = require("discord.js");
const CommandConfig = require("./Config/Command");
const registerCommands = require("./Config/DiscordInteractions");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});
require("dotenv").config();

const commands = new CommandConfig().showCommandsMessages();
registerCommands();

client.once("ready", async () => {
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

module.exports = client;
