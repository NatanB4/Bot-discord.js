const fs = require("fs");

module.exports = class CommandConfig {
  constructor() {
    this.commandsMessages = new Map();
    this.commandsInteractions = [];
  }

  addCommand(command) {
    this.commands.add(command);
  }
  removeCommand(command) {
    this.commands.delete(command);
  }
  getCommand(command) {
    return this.commands.values(command);
  }

  showCommandsMessages() {
    fs.readdir("./src/Commands/Messages", (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const command = new (require(`../Commands/Messages/${file}`))();
        this.commandsMessages.set(command.name, command);
      });
    });

    return this.commandsMessages;
  }

  /**
   * @returns {string[]} commandsInteractions
   * @memberof CommandConfig
   * @description Retorna um array já com o caminho do arquivo e exportado.
   */
  showCommandsInteractions() {
    const commandFiles = fs
      .readdirSync("./src/Commands/Interactions")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../Commands/Interactions/${file}`);
      this.commandsInteractions.push(command.data.toJSON());
    }

    return this.commandsInteractions;
  }
};
