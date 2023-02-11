const express = require("express");
const app = express();
const morgan = require("morgan");
const LoginController = require("../controller/loginController");
const cors = require("cors")

//Configuraciones
app.use(cors())
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

require('./lib/MongooseConnection');

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const loginController = new LoginController();

// API Route
app.use('/api/login',   loginController.post);

//Nuestro primer WS Get
app.get("/", (req, res) => {
  res.json({
    Title: "Hola mundo",
  });
});

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
