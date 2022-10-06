const CommandBase = require("../../Config/CommandBase");
const OpenAiConfig = require("../../Config/OpenAi");
const openai = require("../../Config/OpenAi");

module.exports = class CreateRpgPerson extends CommandBase {
  constructor() {
    super({
      name: "criar-personagem",
      description: "Cria um personagem de RPG",
      usage: "criar-personagem <nome>",
      aliases: ["criar-personagem", "criar-personagem", "create-rpg-person"],
    });
  }

  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    const messageToClassify = args.join(" ");
    const nome = await new OpenAiConfig()
      .setMaxTokens(200)
      .setTemperature(0.9)
      .setPrompt("Crie um nome para um personagem de RPG: ")
      .getAnswer();

    const historia = await new OpenAiConfig()
      .setMaxTokens(200)
      .setTemperature(0.9)
      .setPrompt(`Crie uma história para o personagem ${nome}: `)
      .getAnswer();

    const embed = this.infoEmbed(
      "Personagem criado: " + nome + "\n" + historia
    );

    await message.channel.send({
      embeds: [embed],
    });
  }
};
