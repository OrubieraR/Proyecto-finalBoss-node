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
const http = require('http').Server(app);
require('./lib/MongooseConnection');

const protect = require('./middleware/authMiddleware');
const userData = require('./routes/userData');
const PORT = 4000;
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

	//sends the message to all the users on the server
	socket.on('message', (data) => {
		console.log(data);
		socketIO.emit('messageResponse', data);
	  });
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

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

app.use('/api/public/', express.static('./public/img/'));

//Iniciando el servidor
app.listen(app.get('port'), () => {
	console.log(`Server listening on port ${app.get('port')}`);
});

http.listen(PORT, () => {
	console.log(`Socket listening on ${PORT}`);
  });