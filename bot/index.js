const { Client, Intents } = require('discord.js');
const { config } = require('../config')
const {writeError, writeLog } = require('../logs')
const { formatPlayerNames, formatPlayerIntoTable } = require('./utils')
const { commands, notFound } = require('./commands')
const Db = require('../db/index')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

async function setManteinance(){
  try{
    const recoveredMessages = await Db.getMessages()

    recoveredMessages.forEach(async msg => {
      const channel = await client.channels.fetch(msg.channel)
      if(!channel) Db.deleteMessage(msg.channel, msg.message)
      const message = await channel.messages.fetch(msg.message)
      if(!message) Db.deleteMessage(msg.channel, msg.message)

      const date = new Date().toLocaleString('es-AR', {timeZone: config.timeZone});
      let embed = message.embeds[0];
      embed = {...embed,
        fields: [],
        color: '#ff8800', 
        title: `Estado: ${message.guild.name} - 🟠 MANTENIMIENTO 🟠`,
        description: `**Servidor Cerrado**\n\n **El servidor se encuentra en mantenimiento**\n\n ${config.maintenanceMessage}`,
        image: {
          url: config.maintenanceImage
        },
        footer: {
          text: `Ultima actualizacion: ${date} 🟠`,
        }
      }
      message.edit({embeds: [embed]}).catch(e => console.log('TODO: HANDLE', e)) 
    })
  }catch(e){
    writeError('`Editing Error`\n'+ e)
  }
}

class Bot {
  constructor(){
    this.manteinance = false
    if(!config.botToken) throw new Error('Bot Access Token needed')
    client.login(config.botToken);


    client.on("messageCreate", (message) => {
      if(!message.content.startsWith(config.botPrefix)) return;
      if (message.author.bot) return;

      const commandBody = message.content.slice(config.botPrefix.length);
      const args = commandBody.split(' ');
      const command = args.shift().toLowerCase();

      if(command === 'mantenimiento') {
        this.manteinance = !this.manteinance
        if(this.manteinance) setManteinance()
        return
      }
      if(!commands[command]) return notFound(message, command)
      commands[command](message, args)
    })
  }

  async updateMessages(newState = false, players = []){
    try{
      const recoveredMessages = await Db.getMessages()
      if(!this.manteinance){
        recoveredMessages.forEach(async msg => {
          const channel = await client.channels.fetch(msg.channel)
          if(!channel) Db.deleteMessage(msg.channel, msg.message)
          const message = await channel.messages.fetch(msg.message)
          if(!message) Db.deleteMessage(msg.channel, msg.message)

          const date = new Date().toLocaleString('es-AR', {timeZone: config.timeZone});
          let embed = message.embeds[0];

          if(newState){

            if(msg.type === 'players'){
              const formattedPlayers = formatPlayerNames(players)
              const tableFormatted = formatPlayerIntoTable(formattedPlayers)
              embed = {...embed, 
                fields: tableFormatted,
                color: '#00ff00', 
                title: `Estado: ${message.guild.name} - 🟢 ON 🟢`,
                description: `**[${players?.length ?? 0}] Jugadores activos:** \u200B`,
                image: null,
                footer: {
                  text: `Ultima actualizacion: ${date} 🟢`,
                }
              }
            }else{
              embed = {...embed, 
                color: '#00ff00', 
                title: `Estado: ${message.guild.name} - 🟢 ON 🟢`,
                description: `**Servidor abierto**\n\n **Jugadores activos: ${players?.length ?? 0}**\n\n ${config.onMessage}`,
                image: {
                  url: config.onImage
                },
                footer: {
                  text: `Ultima actualizacion: ${date} 🟢`,
                }
              }
            }

          }else{
            embed = {...embed, 
              fields: [],
              color: '#ff0000', 
              title: `Estado: ${message.guild.name} - 🔴 OFF 🔴`,
              description: `**Servidor Cerrado**\n\n **El servidor se encuentra apagado**\n\n ${config.offMessage}`,
              image: {
                url: config.offImage
              },
              footer: {
                text: `Ultima actualizacion: ${date} 🔴`,
              }
            }
          }
          message.edit({embeds: [embed]}).catch(e => console.log('TODO: HANDLE', e)) 
        })
      }
    }catch(e){
      writeError('`Editing Error`\n'+ e)
    }
    
  }

}

module.exports = new Bot();