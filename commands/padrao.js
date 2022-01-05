const { MessageEmbed } = require('discord.js');
const jsonfile = require('jsonfile');
const fs = require('fs');

function informacao(msg) {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Informações')
        .setAuthor({ name: `${msg.author.tag}`, iconURL: `${msg.author.avatarURL()}` })
        .setDescription(`Bot desenvolvido para realizar pesquisas em tempo real.`)
        .setFields({ name: 'Comandos: ', value: 'Frase: (Frase $titulo, Frase add $titulo, Frase remove $titulo), Nasa: (Nasa), Sinal: {sinal $outrosinal}', inline: false })
        .setTimestamp()
        .setFooter('©', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
    return embed;
}

async function AlterarSinal(qual, id) {
    let sinalAntigo = JSON.parse(JSON.stringify(jsonfile.readFileSync(`./server/Guild-${id}/config.json`)));
    const obj = { sinal: `${qual}` }
    jsonfile.writeFileSync(`./server/Guild-${id}/config.json`, obj)

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Sinal alterado de ${sinalAntigo.sinal} para ${qual}`)
        .setTimestamp()
        .setFooter('©', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
    return embed;
}


module.exports = { informacao, AlterarSinal }