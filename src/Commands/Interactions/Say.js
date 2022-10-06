const { SlashCommandBuilder } = require("discord.js");

module.exports = class SayInteraction {
  constructor() {
    this.name = "falar";
    this.description = "Fala algo";
    this.usage = "/falar <mensagem>";
  }

  /**
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async run(interaction) {
    const message = interaction.options.getString("mensagem");

    await interaction.reply(message);
  }

  request() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption((option) =>
        option
          .setName("mensagem")
          .setDescription("Mensagem que será enviada")
          .setRequired(true)
      );
  }

  // data: new SlashCommandBuilder()
  //   .setName("ping")
  //   .setDescription("Replies with Pong!"),
  // async execute(interaction) {
  //   await interaction.reply("Pong!");
  // },
};
