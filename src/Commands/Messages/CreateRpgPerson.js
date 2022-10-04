const openai = require("../../Config/OpenAi");

module.exports = class CreateRpgPerson {
  constructor() {
    this.name = "criarpersonagem";
    this.description = "Cria um personagem de RPG";
    this.usage = "say <mensagem>";
    this.aliases = ["criarpersonagem", "criarp", "createperson"];
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
    return `Crie um personagem de RPG
        
        Nome: ${args.join(" ")}
        Resultado: '
            Nome: Natsu
            Classe: Mago
            Raça: Humano
            Habilidades: Fogo
            Atributos: Força 1, Destreza 23, Inteligência 41, Sabedoria 2, Constituição 1, Carisma 2 
            Titulo: O Mago de Fogo
        '

        Nome: ${args.join(" ")}
        Resultado: 
            Nome: Luffy
            Classe: Guerreiro
            Raça: Humano
            Habilidades: Haki
            Atributos: Força 3, Destreza 12, Inteligência 41, Sabedoria 12, Constituição 12, Carisma 2
            Titulo: O Guerreiro de Haki
        '

        Nome: ${args.join(" ")}
        Resultado:

       `;
  }
};
