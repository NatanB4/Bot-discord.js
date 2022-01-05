
const config = require('./token.json')
const command = require('./commands/padrao');
const frase = require('./commands/frase');
const request = require('./commands/nasa-api');
const jsonfile = require('jsonfile')
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const nasaapi = require('./commands/nasa-api')
const talkedRecently = new Set();
 
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {

    console.log(`Pronto senhor! ${client.user.tag}`)

})

client.on("message", async msg => {
    await verificarLocal(msg)
    const sinalAntigo = JSON.parse(JSON.stringify(jsonfile.readFileSync(`./server/Guild-${msg.guild.id}/config.json`)));
    const param = sinalAntigo;
    const content = msg.content.toLowerCase().split(" ");
    const sinal = param.sinal;

    if (msg.author.bot) return;

    if (msg.content == `${sinal}info`) {
        const info = command.informacao(msg)

        msg.channel.send({ embeds: [info] })
    }

    if (msg.content == `${sinal}Math ${content[1]} ${content[2]} ${content[3]}`) {

        const calc = command.calc(msg, content[1], content[2], content[3]);

        msg.channel.send({ embeds: [calc] })
    }

    if (msg.content.toLowerCase() == `${sinal}sinal ${content[1]}`) {

        if (!msg.member.permissions.has("ADMINISTRATOR")) {
            return msg.channel.send(`Você não tem permissão!`)
        }

        const dados = await command.AlterarSinal(content[1], msg.guild.id);
        msg.channel.send({ embeds: [dados] })
    }
	//frases
    if (msg.content.toLowerCase() === `${sinal}frase add ${content[2]}`) {
        msg.channel.send("Executando..")
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
            return msg.channel.send("Infelizmente você é incapaz de realizar isso!")
        }

        const dados = await frase.FraseAdd(content[2], msg.guild.id);
        msg.channel.send({ embeds: [dados] })

    }
    
    if (msg.content.toLowerCase() === `${sinal}frase remove ${content[2]}` || msg.content.toLowerCase() === `${sinal}frase remover ${content[2]}`) {
        msg.channel.send("Executando..")
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
            return msg.channel.send("Infelizmente você é incapaz de realizar isso!")
        }

        const dados = await frase.FraseDeleta(content[2], msg.guild.id);
        msg.channel.send({ embeds: [dados] })

    }

    if (msg.content.toLowerCase() === `${param.sinal}frase ${content[1]}`) {
        const dados = await frase.Frase(content[1], msg.guild.id);
        msg.channel.send({ embeds: [dados] })
    }

    if (msg.content.toLowerCase() === `${param.sinal}frase`) {
        const dados = frase.FraseMostrar(msg.guild.id);
        msg.channel.send({ embeds: [dados] })
    }
    //fim
   	//nasa
	if (msg.content.toLowerCase() === `${param.sinal}nasa`) {
  		  if (talkedRecently.has(msg.author.id)) {
            msg.channel.send("Espere um minuto para digitar esse comando novamente!. - " + msg.author.tag);
    		} else {
		const dados = await nasaapi.nasa();
       	 msg.channel.send({ embeds: [dados] })
  	 	 }
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          talkedRecently.delete(msg.author.id);
        }, 60000);
    }
})

async function verificarLocal(msg) {
    if (!fs.existsSync(`./server/Guild-${msg.guild.id}`)) {
        fs.mkdirSync(`./server/Guild-${msg.guild.id}`)

        let configPADRAO = jsonfile.readFileSync('./JSON/config.json', 'utf-8')
        let frasesPADRAO = jsonfile.readFileSync('./JSON/frases.json', 'utf-8')

        let confAt = JSON.parse(JSON.stringify(configPADRAO))
        let frasAt = JSON.parse(JSON.stringify(frasesPADRAO))

        jsonfile.writeFileSync(`./server/Guild-${msg.guild.id}/config.json`, confAt)
        jsonfile.writeFileSync(`./server/Guild-${msg.guild.id}/frases.json`, frasAt)
        return
    }
    return
}

client.login(config.BOT_TOKEN);