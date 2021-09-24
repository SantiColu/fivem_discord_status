const { config } = require('../config')

const commands = {
  mantenimiento: (message, args) => {
    console.log('mantenimiento recibido')
  },

  create: (message, args) => {
    console.log('create recibido')
  }
}

const notFound = (message, args) => {
  message.reply("El comando `" + command + "` no existe").then((reply) => {
    setTimeout(() => {
        reply.delete();
    }, 5000);
  });
  setTimeout(() => {
      message.delete();
  }, 1000)
}

export default {commands, notFound}