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
      const message = 'Not authorized, invalid token'
      return res.status(401).json({ message })
    }
  }

  if (!token) {
    const message = 'Not authorized, no token found'
    return res.status(401).json({ message })
  }
}

module.exports = protect;