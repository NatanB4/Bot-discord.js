const openai = require("../Config/OpenAi");
const { MessageEmbed } = require('discord.js');

module.exports = class Opinion {
    constructor() {
        this.name = 'Classification'
        this.description = 'Fala algo'
        this.usage = 'say <mensagem>'
        this.aliases = ['classifique', 'class', 'classification']
    }

    /**
     * @param {import('discord.js').Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        const completion =
            await openai.createCompletion({
                model: "text-davinci-002",
                prompt: this.generatePrompt(args),
                temperature: 0.6,
                max_tokens: 200
            });

        message.channel.send({ embeds: [this.messageEmbed(completion.data.choices[0].text)] });
    }

    generatePrompt(args) {
        return `Classifique o sentimento da Frase
        
        Frase: 'Eu amo cachorros'
        Resultado: 'Positivo'

        Frase: 'Não gostou e nem gosto de você'
        Resultado: 'Neutro'
        
        Frase: 'Ainda acho que você é um lixo'
        Resultado: 'Negativo'

        Frase: ${args.join(' ')}
        Resultado: `

    }

    messageEmbed(description) {
        const color = description.includes('Positivo') ? 'GREEN' : description.includes('Negativo') ? 'RED' : 'YELLOW';

        const embed = new MessageEmbed()
            .setTitle('Classificação de Sentimento')
            .addFields(
                { name: 'Resultado: ', value: `#${description.trim()}`, inline: true },
            )
            .setTimestamp()
            .setColor(color)


        return embed
        // FILE gitignore
    }
}