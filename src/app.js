const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const passwordReset = require('./routes/passwordReset');
const passwordChange = require('./routes/passwordChange');
const adverts = require('../initialAdverts');
const advertsResults = require('./routes/adverts');
const createAdvert = require('./routes/newadvert');
const contactMe = require('./routes/contactMe')

require('./lib/MongooseConnection');
require('./lib/SocketIOConnection')

const protect = require('./middleware/authMiddleware');
const userData = require('./routes/userData');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// API Route

// Register
app.use('/api/register', register);
//Login
app.use('/api/login', login);
// GET all adverts
app.use('/api/adverts', advertsResults);
//Password Reset Email
app.use('/api/requestPasswordReset', passwordReset);
//Password Change Email
app.use('/api/passwordChange', passwordChange);
//Profile Data
app.use('/api/user', protect, userData);
// Create Adverts
app.use('/api/adverts', createAdvert);
// Email Contact
app.use('/api/contactEmail', contactMe);

app.use('/api/public/', express.static('./public/img/'));

//Iniciando el servidor
app.listen(app.get('port'), () => {
	console.log(`Server listening on port ${app.get('port')}`);
});

