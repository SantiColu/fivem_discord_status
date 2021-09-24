const { config } = require('./config')

function writeError(message) {
  let nDate = new Date().toLocaleString('es-AR', {
      timeZone: config.timeZone
  });
  console.log(nDate + " | " + message);       
  
  try {
      axios.post(config.errorWebhook, {
          username: 'ERROR',
          content: message
      })
  } catch(err){
      console.error(err)
  }
}

function writeLog(message) {
  let nDate = new Date().toLocaleString('es-AR', {
      timeZone: config.timeZone
  });
  console.error(nDate + " | " + message);       
  
  try {
      axios.post(config.logsWebhook, {
          username: 'LOG',
          content: message
      })
  } catch(err){
      console.error(err)
  }
}

module.exports = {
  writeLog, 
  writeError
}
