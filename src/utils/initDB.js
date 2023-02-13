
const readline = require("readline");
const advertsData = require("../../initialAdverts.js");

// Conecting to database

const connection = require("../lib/MongooseConnection");

// Load models
const Advert = require("../models/Advert");
const User = require("../models/User");

async function main() {
  
  await new Promise ((resolve, reject)=>{
    connection.once('open', resolve)
    connection.once('error', reject)
  }) 

  await initAdverts()
  await initUsers()

  connection.close()
}

async function initAdverts(){
  const { deletedCount } = await Advert.deleteMany()
  console.log(`Eliminados ${deletedCount} anuncios`)
  const inserted = await Advert.insertMany(advertsData)
  console.log(`Insertados ${inserted.length} anuncios`)
}

async function initUsers(){
  const { deletedCount } = await User.deleteMany()
  console.log(`Eliminados ${deletedCount} usuarios`)
  const inserted = await User.insertMany([
    {
      "name": "david",
      "password": await User.hashPwd("1234"),
      "email": "primo@primo"
    },
    {
      "name": "draka",
      "password": await User.hashPwd("123456") ,
      "email": "primo@primo.com"
    }
])
  console.log(`Insertados ${inserted.length} usuarios`)
}

main().catch((err) => console.log(err))