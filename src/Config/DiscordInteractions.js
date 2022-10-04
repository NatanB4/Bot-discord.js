const CommandConfig = require("./Command");
const { REST, Routes } = require("discord.js");
require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const registerCommands = async () => {
  const commandsInteractions = new CommandConfig().showCommandsInteractions();

  try {
    console.log(
      `Started refreshing ${commandsInteractions.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commandsInteractions }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = registerCommands;
