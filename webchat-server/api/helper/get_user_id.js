const jwt = require("jsonwebtoken");

module.exports = function (token) {

  let accessVerifyOptions = {
    issuer: "webcaht",
    expiresIn: "3d",
  };
  let decoded 
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      accessVerifyOptions
    );
  } catch (error) {
    console.log("getUserId\t::\tfailed");
    return false
  }

  return  {users_id :decoded.users_id, users_name : decoded.users_name }; 
};
