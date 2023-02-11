const express = require("express");
const app = express();
const morgan = require("morgan");
const register = require("./routes/register")
const LoginController = require("../controller/loginController");
const cors = require("cors")
require("./lib/MongooseConnection");

const adverts = require("../initialAdverts")
const users = require("../initialUser")
//Configuraciones
app.use(cors())
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

require('./lib/MongooseConnection');

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const loginController = new LoginController();

// API Route
app.use('/api/login',   loginController.post);
//Nuestro primer WS Get
app.get("/", (req, res) => {
  res.send("Welcome to the game online shop API...");
});

app.get("/adverts", (req,res)=>{
  res.send(adverts)
})

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
