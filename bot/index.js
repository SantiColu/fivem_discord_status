const { Client, Intents } = require('discord.js');
const { config } = require('../config')
const { formatPlayerNames, formatPlayerIntoTable } = require('./utils')
const { commands, notFound } = require('./commands')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

class bot {
  constructor(){
    this.manteinance = false
    if(!config.botToken) throw new Error('Bot Access Token needed')
    client.login(config.botToken);

    client.on("messageCreate", function(message) {
      if(!message.content.startsWith(config.botPrefix)) return;
      if (message.author.bot) return;

      const commandBody = message.content.slice(config.botPrefix.length);
      const args = commandBody.split(' ');
      const command = args.shift().toLowerCase();

      if(!commands[command]) return notFound(message, args)
      commands[command](message, args)
    })
  }

  updateMessages(newState, players){
    const recoveredMessages = [] //TODO: traer todos los mensajes de la DB
    if(!this.manteinance){
      if(newState){
        //TODO: chequear 'permisos/tipo' del mensaje 
        // .- Format names -> Format table -> fully edit
        // o
        // .- simple edit
      }else{
        //TODO: editar -> apagado
      }
    }
  }

}

module.exports = new bot();






