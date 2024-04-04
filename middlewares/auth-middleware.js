const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const auth = async (req, res, next) => {
    
  try {
    let token = req.headers.authorization;

    if (!token) {
      res.status.json({ message: `unauthorized token not provided` });
    } else {
      token = token.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decode.userId).select("-password");

      next();
    }
  } catch (error) {
    res.status(401).json({ message: `NOT authorized invalid token` });
  }
};
module.exports = { auth };
