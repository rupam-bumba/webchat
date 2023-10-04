const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let accessVerifyOptions = {
      issuer: "webcaht",
      expiresIn: "3d",
    };

    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      accessVerifyOptions
    );

    req.users_data = decoded;
    return next();
  } catch (err) {
    let error = new Error("Web Token Authentication Fail");
    error.status = 401;
    return next(error);
  }
};
