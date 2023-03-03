const express = require("express");
const app = express();
const morgan = require("morgan");
const login = require("./routes/login");
const register = require("./routes/register");
const passwordReset = require("./routes/passwordReset")
const passwordChange = require("./routes/passwordChange")
const cors = require("cors");
require("./lib/MongooseConnection");

const adverts = require("../initialAdverts");

const advertsResults = require("./routes/adverts");

//Configuraciones
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// API Route
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/adverts", advertsResults);
app.use("/api/requestPasswordReset",passwordReset)
app.use("/api/passwordChange",passwordChange)
//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
