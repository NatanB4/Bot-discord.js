const request = require('request');
const jsonfile = require('jsonfile');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

async function criar(){
    const age = getRandom(1996, 2021);
    const mes = getRandom(1, 12);
    const day = getRandom(1, 30);
    const date = `${age}-${mes}-${day}`;
    
    request(`https://api.nasa.gov/planetary/apod?api_key=tUCYXBxaQQNimzmkKhycL6l5IEadJxyFcPPO9qDI&date=${date}`, { json: true }, (err, res, body) => {
		if(err){
            console.log(err)
        }
        
        const array = { "url":body.url, "exp":body.explanation}
 	 	jsonfile.writeFileSync(`ultimaImagem.json`, array)
    });
}

async function nasa () {
	await criar();	
    const dados = jsonfile.readFileSync('ultimaImagem.json', 'utf-8');
    let atualizar = JSON.parse(JSON.stringify(dados))

    const embed = new MessageEmbed()
            .setColor('#0099ff')
			.setImage(atualizar.url)
            .setTimestamp()
            .setFooter('©', 'https://cdn.discordapp.com/avatars/786998098580602971/11f12129cd295265beb67e038ba23fc3.webp');
    return embed
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = {nasa };