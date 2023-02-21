const nodemailer = require('nodemailer')

const createTransport = () =>{
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f464597db2ed82",
      pass: "c7fe240eda4239"
    }
  });
  return transport 
}


const sendMail = async (user,email) =>{

const transporter = createTransport()
const info = await transporter.sendMail({
      
  from: '"UwuntuGames🛒" <UwuntuGames@games.com>',
  to: email,
  subject: `Hola ${user}, bienvenido UwUntuGames`,
  html: "<b>Hello World!!!</b>"
})

   console.log("Message sent: %s", info.messageId)
   return
}


exports.sendMail =(user, email) =>sendMail(user , email)