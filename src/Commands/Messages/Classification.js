const openai = require("../../Config/OpenAi");
const { MessageEmbed, EmbedBuilder } = require("discord.js");
const CommandBase = require("../../Config/CommandBase");
const OpenAiConfig = require("../../Config/OpenAi");

module.exports = class Opinion extends CommandBase {
  constructor() {
    super({
      name: "Classification",
      description: "Classifica o sentimento de uma frase",
      usage: `class <mensagem>`,
      aliases: ["class"],
    });
  }

  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    const messageToClassify = args.join(" ");
    const completion = await new OpenAiConfig()
      .setMaxTokens(1700)
      .setTemperature(0.8)
      .setPrompt(
        `Classificação de sentimento Texto: 

      Texto: 'Cara, eu odeio esse cara'
      Sentimento: 'Ódio'

      Texto: 'Cara, eu amo esse cara'
      Sentimento: 'Amor'

      Texto: 'eu estou triste'
      Sentimento: 'Tristeza'

      Texto: 'eu estou feliz'
      Sentimento: 'Felicidade'

      Texto: 'eu estou com raiva'
      Sentimento: 'Raiva'

      Texto: 'eu estou com medo'
      Sentimento: 'Medo'

      Texto: 'eu estou com nojo'
      Sentimento: 'Nojo'

      Texto: 'eu estou com surpresa'
      Sentimento: 'Surpresa'

      Texto: `
      )
      .getAnswer(messageToClassify);

    const embed = this.infoEmbed(
      "Texto: " + messageToClassify + "\n\n" + completion.trim()
    );

    await message.channel.send({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  }
};
