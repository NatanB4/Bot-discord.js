const { EmbedBuilder } = require("@discordjs/builders");

module.exports = class CommandBase {
  constructor({ name, description, usage, aliases }) {
    this.name = name;
    this.description = description;
    this.usage = usage;
    this.aliases = aliases;
  }

  /**
   * @param {string} content
   * @returns {import("@discordjs/builders").MessageEmbed}
   */
  infoEmbed(content) {
    return new EmbedBuilder()
      .setTitle(`${this.name} - ${this.description}`)
      .setDescription(content)
      .setColor(0x00ff00);
  }

  error(content) {}
  success(content) {}
  warning(content) {}
};
