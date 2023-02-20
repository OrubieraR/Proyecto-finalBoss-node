const express = require("express");
const app = express();
const morgan = require("morgan");
const LoginController = require("../controller/loginController");
const register = require("./routes/register");
const cors = require("cors");
require("./lib/MongooseConnection");
const getUserProfile = require("../controller/userController");
const protect = require("./middleware/authMiddleware");
const router = require("./routes/register");

//Configuraciones
app.set("port", process.env.PORT || 3001);
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
router.route("/api/profile").get(protect, getUserProfile)

// app.get("/adverts", (req,res)=>{
//   res.send(adverts)
// })

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});