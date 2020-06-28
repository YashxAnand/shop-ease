const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: ["No token authorization denied"] });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: ["Invalid token, authorization failed"] });
    }
  }
};

module.exports = auth;
