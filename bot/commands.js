const { config } = require('../config')
const Db = require('../db/index')

const commands = {
  // mantenimiento: (message, args, bot) => {
  //   console.log(bot.manteinance)
  //   // bot.updateMessages(false, [])
  //   // console.log('mantenimiento recibido')
  // },

  create: (message, args) => {
    const channel = message.channel 
    const date = new Date().toLocaleString('es-AR', {timeZone: config.timeZone});
    if(args[0] === 'players' || args[0] === 'hidden' || !args[0]){

      const embed = new Discord.MessageEmbed()
      .setColor('#cccccc')
      .setTitle(`Estado ${message.guild.name}`)
      .setDescription("Sin estado definido")
      .setFooter(`Ultima actualizacion: ${date} ⚪`);

      channel.send({
        embeds: [
          {
            color: '#cccccc',
            title: `Estado: ${message.guild.name}`,
            description: "Sin estado definido",
            footer: {
              text: `Ultima actualizacion: ${date} ⚪`,
            }
          }
        ],
      }).then((sentMessage) => {
        Db.createNewMessage(args[0] ?? 'hidden', sentMessage.channel, sentMessage)
      });
    }
    
  }
}

const notFound = (message, command) => {
  message.reply("El comando `" + command + "` no existe").then((reply) => {
    setTimeout(() => {
        reply.delete();
    }, 5000);
  });
  setTimeout(() => {
      message.delete();
  }, 1000)
}

module.exports = {commands, notFound}