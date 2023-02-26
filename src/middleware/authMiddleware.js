const { User } = require("../models");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // extract token from authHeader string
      token = authHeader.split(' ')[1]

      // verified token returns user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // find user's obj in db and assign to req.user
      req.user = await User.findById(decoded._id).select('-password')
  
      next()
    } catch (error) {
      res.status(401)
      console.log(error);
      throw new Error('Not authorized, invalid token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
}

module.exports = protect;