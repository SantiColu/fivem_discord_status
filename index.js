const axios = require('axios');
const bot = require('./bot')
const { config } = require('./config')
const { writeLog, writeError } = require('./logs')
let lastHeartBeat = Date.now();

setInterval(askForHB, config.timeBetweenHeartbeats);

function askForHB(){
  if(parseInt((Date.now() - lastHeartBeat)/1000) > 12){
    lastHeartBeat = null;
    writeError("`requestError:` **SERVIDOR NO RESPONDE**");
    bot.updateMessages(false);
  }

  axios({
    method: 'get',
    timeout: 2000,
    url: `http://${config.ip}:${config.port}/players.json`
  })
  .then((response) =>{
    lastHeartBeat = Date.now();
    if(!response.data) return writeLog('`requestError:` no data received');
    bot.updateMessages(true, response.data)
  })
  .catch((error) =>{
    writeError('`requestError:`\n'+error+'\n\n')
  })
}
