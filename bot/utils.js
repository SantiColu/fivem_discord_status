const { config } = require('../config')

const formatPlayerNames = (players) => {
  let responsePlayers = []

  players.map((v) => {
    let pingEmoji = '⚪'
    if(v.ping > 0 && v.ping < 50){
        pingEmoji = '🟢'
    }else if(v.ping >= 50 && v.ping < 120){
        pingEmoji = '🟠'
    }else if(v.ping >= 120){
        pingEmoji = '🔴'
    }
    responsePlayers.push(`${pingEmoji} | ${v.name}`)
  });

  return responsePlayers
}

const formatPlayerIntoTable = (players) => {
  let totalDescriptionLength = 0
  let playerDescription = []
  let fields = []

  for(player in players){
    totalDescriptionLength += players[player].length + 2 //the 2 characters that takes the '\n' 
  }

  for(let i=0; i<(totalDescriptionLength/1020); i++){
    playerDescription.push('')

    while(players.length > 0){
      let temp = playerDescription[i]
      playerDescription[i] += players[0] + "\n"

      if(playerDescription[i].length > 1020){
        playerDescription[i] = temp;
        break;
      }
      players.splice(0, 1) //deletes the first position, always the current one :)
    }
  }

  playerDescription.map(v => {
    fields.push(
      { name: 'Jugador', value: v, inline:true },
    );
  });

  return fields
}

module.exports = {
  formatPlayerIntoTable,
  formatPlayerNames
}



