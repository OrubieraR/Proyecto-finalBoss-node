const express = require("express");
var app = express();
const morgan = require("morgan");

require("./lib/MongooseConnection");

const cors = require("cors");

app.use(cors());

//RUTAS DEL API
app.use("/api/adverts", require("./api/adverts"));

//Configuraciones
app.set("port", process.env.PORT || 3005);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
