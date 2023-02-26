const express = require("express");
const app = express();
const morgan = require("morgan");
const login = require("./routes/login");
const register = require("./routes/register");
const cors = require("cors");
require("./lib/MongooseConnection");
const fileupload = require("express-fileupload");
const adverts = require("../initialAdverts");
const advertsResults = require("./routes/adverts");
const createAdvert = require("./routes/newadvert");

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

// Routes and post to create advert
app.use("/api/adverts", createAdvert);

// app.get("/adverts", (req,res)=>{
//   res.send(adverts)
// })

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
