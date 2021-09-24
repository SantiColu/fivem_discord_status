const dbName = "db.json";
const fs = require('fs');

class db {
  constructor(){
    this.data = {}
    fs.readFile(dbName, (err, data) =>{
      if(err) return reject(err)
      this.data = data
      resolve(data)
    })

    if(!this.data.messages) this.data.messages = []
    updateDB()
  }

  refreshDB(){
    return new Promise((resolve, reject) => {
      fs.readFile(dbName, (err, data) =>{
        if(err) return reject(err)
        db = data
        resolve(data)
      })
    })
  }

  updateDB() {
    return new Promise((resolve, reject) => {
      fs.writeFile(dbName, JSON.stringify(config), (err) => {
        if(err) return reject(err)
        resolve(db)
      });
    })
  }

  getMessages() {
    return new Promise((resolve, reject) => {
      if(!db) return reject('no data')
      resolve(db.messages)
    })
  }

  createNewMessage(type, channel, message) {
    return new Promise((resolve, reject) => {
      if(type && channel && message){
        const newMessage = {type, channel, message}
        db.message.push(newMessage)
        updateDB().then(()=>{resolve(newMessage)}).catch(reject)
      }else{
        reject('bad request')
      }
    })
  }

  deleteMessage(channel, message) {
    return new Promise((resolve, reject) => {
      if(channel && message){
        const index = db.message.findIndex((v) => v.channel == channel && v.message == message)
        db.message.splice(index, 1)
        updateDB().then(()=>{resolve(newMessage)}).catch(reject)
      }else{
        reject('bad request')
      }
    })
  }
}

module.exports = new db();
