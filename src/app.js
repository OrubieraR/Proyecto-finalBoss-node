const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors")
const register = require("./routes/register")
require("./lib/MongooseConnection");

const adverts = require("../initialAdverts")
const users = require("../initialUser")
//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/register",register)

app.use(express.urlencoded({ extended: false }));

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
