const express = require("express");
const app = express();
const morgan = require("morgan");
const LoginController = require("../controller/loginController");
const register = require("./routes/register");
const cors = require("cors");
require("./lib/MongooseConnection");
const adverts = require("../initialAdverts");

//Configuraciones
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const loginController = new LoginController();
// API Route
app.use("/api/register", register);
app.use("/api/login", loginController.post);
app.use("/api/adverts", require("./api/adverts"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
