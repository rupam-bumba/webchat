const usersDB = require("../../model/users");
const jwt = require("jsonwebtoken");

exports.post = async (req, res) => {
  let users = await usersDB
    .find({
      users_name: req.body.users_name,
    })
    .exec();

  if (users.length === 0) {
    return res.status(404).json({ message: "Users Not Found" });
  }

  if (users[0].password !== req.body.password) {
    return res.status(200).json({ message: "Password Not Match" });
  }

  let payload = {
    users_id: users[0].id,
    users_name: users[0].users_name,
  };

  let accessSignOptions = {
    issuer: "webcaht",
    expiresIn: "3d",
  };

  const access = jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY,
    accessSignOptions
  );

  return res.status(200).json({ message: "success", access: access });
};
