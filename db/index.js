const dbName = "./db/db.json";
const { config } = require('../config')
const fs = require('fs');

class Db {
  constructor(){
    this.data = {}
    fs.readFile(dbName, 'utf8', (err, data) =>{
      if(err) throw err
      this.data = JSON.parse(data)
      
      if(!this.data.messages) this.data.messages = []
      
      fs.writeFile(dbName, JSON.stringify(this.data, null, 4), (err) => {
        if(err) throw err
      });
    })
    
  }

  refreshDB(){
    return new Promise((resolve, reject) => {
      fs.readFile(dbName, 'utf8', (err, data) =>{
        if(err) return reject(err)
        this.data = JSON.parse(data)
        resolve(dathis.datata)
      })
    })
  }

  updateDB() {
    return new Promise((resolve, reject) => {
      fs.writeFile(dbName, JSON.stringify(this.data, null, 4), (err) => {
        if(err) return reject(err)
        resolve(this.data)
      });
    })
  }

  getMessages() {
    return new Promise((resolve, reject) => {
      if(!this.data) return reject('no data')
      resolve(this.data.messages ?? {})
    })
  }

  createNewMessage(type, channel, message) {
    return new Promise((resolve, reject) => {
      if(type && channel && message){
        const newMessage = {type, guild: channel.guild.id , channel: channel.id, message: message.id}
        this.data.messages.push(newMessage)
        this.updateDB().then(()=>{resolve(newMessage)}).catch(reject)
      }else{
        reject('bad request')
      }
    })
  }

  deleteMessage(channel, message) {
    return new Promise((resolve, reject) => {
      if(channel && message){
        const index = this.data.messages.findIndex((v) => v.channel == channel && v.message == message)
        this.data.messages.splice(index, 1)
        this.updateDB().then(()=>{resolve(newMessage)}).catch(reject)
      }else{
        reject('bad request')
      }
    })
  }

}

module.exports = new Db();
