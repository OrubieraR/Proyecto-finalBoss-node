
const readline = require("readline");
const advertsData = require("../../initialAdverts.js");
const userData = require("../../initialUser.js");


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
  const inserted = await User.insertMany(userData)
  console.log(`Insertados ${inserted.length} usuarios`)
}

main().catch((err) => console.log(err))