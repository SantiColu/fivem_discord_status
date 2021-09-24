const axios = require('axios');
const { config } = require('./config')
const { writeLog, writeError } = require('./logs')
let lastHeartBeat = Date.now();

setInterval(askForHB, config.TimeBetweenHeartbeats);

function askForHB(){
  if(parseInt((Date.now() - lastHeartBeat)/1000) > 120){
    lastHeartBeat = null;
    writeError("`requestError:` **SERVIDOR NO RESPONDE**");
    bot.updateMessage(false);
  }

  axios.get(`http://${config.ip}:${config.port}/players.json`)
  .then((response) =>{
    lastHeartBeat = Date.now();
    if(!response.data) return writeLog('`requestError:` no data received');
    
    bot.updateMessage(true, response.data)
  })
  .catch((error) =>{
    writeError('`requestError:`'+error)
  })
}
