const express = require("express");
const app = express();
const morgan = require("morgan");
const login = require("./routes/login");
const register = require("./routes/register");
const cors = require("cors");
require("./lib/MongooseConnection");

const protect = require("./middleware/authMiddleware");
const router = require("./routes/register");

const adverts = require("../initialAdverts");

const advertsResults = require("./routes/adverts");
const userData = require("./routes/userData")
//Configuraciones
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// API Route
app.use("/api/register", register);

// app.get("/adverts", (req,res)=>{
  //   res.send(adverts)
  // })
  app.use("/api/login", login);
  app.use("/api/adverts", advertsResults);
  app.use("/api/user", userData)

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});