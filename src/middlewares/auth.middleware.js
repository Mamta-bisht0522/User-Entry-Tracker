const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("reached");
  try {
    let token;
    const cookieToken = req.cookies.jwt;
    if (cookieToken) {
      token = cookieToken;
    }

    let headerToken = req.headers["authorization"];
    if (headerToken) {
      token = headerToken.slice(7);
    }
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid Authentication",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = auth;
