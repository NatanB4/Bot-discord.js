const openai = require("../../Config/OpenAi");

module.exports = class Opinion {
  constructor() {
    this.name = "opinião";
    this.description = "Fala algo";
    this.usage = "say <mensagem>";
    this.aliases = ["opnião", "opniao", "opinião"];
  }

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
    return ` Defina sua opnião
        
        Opnião: 'O que você acha de carros?'
        Resultado: 'Eu acho que carros são muito legais'

        Opnião: 'O que você acha de Lol?'
        Resultado: 'Eu acho que Lol é um jogo muito bom'
        
        Opnião: 'Você gosta de pizza?'
        Resultado: 'odeio'

        Opnião: 'Você gosta de cachorro?'
        Resultado: 'Eu amo cachorros'

        Defina sua opnião sobre: ${args.join(" ")}
        Opinião: `;
  }
};
