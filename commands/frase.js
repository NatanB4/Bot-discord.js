const { MessageEmbed } = require('discord.js');
const jsonfile = require('jsonfile');
const pensador = require('pensador-api')
const fs = require('fs');

async function Frase(frase, id) {
    let notexist = true;
    let frjson = jsonfile.readFileSync(`./server/Guild-${id}/frases.json`);
    let atualizar = JSON.parse(JSON.stringify(frjson))

    atualizar.frases.dialog.map(el => {
        if (el[0] === frase) {
            notexist = false;
        }
    })

    if (notexist) {
        msg = "Infelizmente ainda não adicionamos esse tema :/... peça para um staff!"

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${msg}`)
            .setTimestamp()
            .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
        return embed;
    } else {
        //localizar a frase
        let aleatorio;
        let author;
        const ale = Math.round(Math.random() * (10 - 1) + 1)
        for (let index = 0; index < atualizar.frases.dialog.length; index++) {
            if (atualizar.frases.dialog[index].indexOf(frase) >= 0) {
                aleatorio = atualizar.frases.dialog[index][2][ale].text;
                author = atualizar.frases.dialog[index][2][ale].author;
            }
        }

        //quantidade de frases.        
        let s = 0;
        for (let index = 0; index < atualizar.frases.dialog.length; index++) {
            s = s + atualizar.frases.dialog[index][1];
        }

        //mensagem
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${aleatorio}`)
            .setDescription(`Frase de ${author}`)
        	.addFields(
			{ name: 'Quantidade de Frases disponíveis: ', value: `#${s}`, inline: true },
								)
            .setTimestamp()
            .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
        return embed;
    }
}

async function FraseAdd(frase, id) {
    let notexist = true;
    let frjson = jsonfile.readFileSync(`./server/Guild-${id}/frases.json`);
    let atualizar = JSON.parse(JSON.stringify(frjson))

    atualizar.frases.dialog.map(el => {
        if (el[0] === frase) {
            notexist = false;
        }
    })

    if (notexist) {
        const dados = await pensador({ term: frase, max: 10 })

        atualizar.frases.dialog.push([`${frase}`, dados.total, dados.phrases])
        jsonfile.writeFileSync(`./server/Guild-${id}/frases.json`, atualizar)

        JSON.stringify(frjson);

        let s = 0;
        for (let index = 0; index < atualizar.frases.dialog.length; index++) {
            s = s + atualizar.frases.dialog[index][1];
        }

        const embed = new MessageEmbed()
            .setColor('#3E7C17')
            .setTitle(`Consegui buscar o tema ${frase} com sucesso!`)
            .setTimestamp()
            .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
        return embed;
    }
    const temasArray = [];
    atualizar.frases.dialog.map(el => {
        let temp = el[0]
        temasArray.push(temp)
    })
    const embed = new MessageEmbed()
        .setColor('#9B0000')
        .setTitle(`Eu já tenho esse tema em meus dados!`)
        .setDescription(`Temas disponíveis: ${temasArray}`)
        .setTimestamp()
        .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
    return embed;
}

function FraseMostrar(id) {
    let frjson = jsonfile.readFileSync(`./server/Guild-${id}/frases.json`);
    let atualizar = JSON.parse(JSON.stringify(frjson))
    const temasArray = [];

    atualizar.frases.dialog.map(el => {
        let temp = el[0]
        temasArray.push(temp)
    })

    const embed = new MessageEmbed()
        .setColor('#FFC900')
        .setTitle(`Temas disponíveis: ${temasArray}`)
        .setTimestamp()
        .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
    return embed;
}

function FraseDeleta(frase, id) {
    let notexist = true;
    let frjson = jsonfile.readFileSync(`./server/Guild-${id}/frases.json`);
    let atualizar = JSON.parse(JSON.stringify(frjson))

    atualizar.frases.dialog.map(el => {
        if (el[0] === frase) {
            notexist = false;
        }
    })

    if (notexist) {
        const temasArray = [];
        atualizar.frases.dialog.map(el => {
            let temp = el[0]
            temasArray.push(temp)
        })
            
        const embed = new MessageEmbed()
            .setColor('#9B0000')
            .setTitle(`O tema não existe!`)
            .setDescription(`Temas disponíveis: ${temasArray}`)
            .setTimestamp()
            .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
        return embed;
    } else {
        for (let i = 0; i < atualizar.frases.dialog.length; i++) {

            if (atualizar.frases.dialog[i][0] == frase) {
                
                atualizar.frases.dialog.splice(atualizar.frases.dialog, 1);
                jsonfile.writeFileSync(`./server/Guild-${id}/frases.json`, atualizar)
            }
        }
        
        const temasArray = [];
        atualizar.frases.dialog.map(el => {
            let temp = el[0]
            temasArray.push(temp)
        })
        
          const embed = new MessageEmbed()
            .setColor('#9B0000')
            .setTitle(`Apagado com sucesso!`)
            .setDescription(`Temas disponíveis: ${temasArray}`)
            .setTimestamp()
            .setFooter('© Todos o direitos reservados', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
        return embed;
    }
}

module.exports = { Frase, FraseAdd, FraseMostrar, FraseDeleta }