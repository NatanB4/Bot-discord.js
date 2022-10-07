const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const CommandConfig = require("./Config/Command");
const registerCommands = require("./Config/DiscordInteractions");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
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
    else if (value.aliases.join(" ").search(command.replace("!", " ")) > -1)
      return message.channel.send(
        `Você quis dizer "${value.usage.replace("mensagem", args.join(" "))}?"`
      );
    else continue;
  }

  // if (commands.has(content)) return commands.get(command).run(message, args);

  // message.channel.send('@Nata#0711')
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const isCommandInteraction = new CommandConfig().showCommandsInteractions();
  for (const command of isCommandInteraction) {
    if (interaction.commandName === command.name) {
      return command.run(interaction, client);
    }
  }
});

client.on("messageDelete", async (message) => {
  const channel = client.channels.cache.get("1027234110407704606");
  const embed = new EmbedBuilder()
    .setTitle("Mensagem Deletada")
    .setDescription(
      `**Autor:** ${message.author.tag}\n**Mensagem:** ${message.content}`
    )
    .addFields(
      { name: "Canal", value: `${message.channel.name}` },
      { name: "ID", value: `${message.id}` },
      { name: "Data", value: `${message.createdAt}` }
    )
    .setThumbnail(message.author.displayAvatarURL())
    .setColor("#ff0000")
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

module.exports = client;
