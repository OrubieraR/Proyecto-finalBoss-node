const { User } = require("../src/models");

const getUserProfile = async (req, res) => {
    
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
  module.exports = getUserProfile;