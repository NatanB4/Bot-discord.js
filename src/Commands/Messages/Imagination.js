const openai = require("../../Config/OpenAi");

module.exports = class Imagination {
  constructor() {
    this.name = "imaginação";
    this.description = "Fala algo";
    this.usage = "say <mensagem>";
    this.aliases = ["imaginação", "imagine", "imagination"];
  }
  /**
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: this.generatePrompt(args),
      temperature: 0.6,
      max_tokens: 200,
    });

    message.channel.send(completion.data.choices[0].text);
  }

  generatePrompt(args) {
    return args.join(" ");
  }
};
