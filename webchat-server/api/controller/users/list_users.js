const usersDB = require("../../model/users");

exports.get = async (req, res, next) => {
  let users_list = await usersDB.find().select("users_name").exec();
  res.status(200).json( users_list );
};
